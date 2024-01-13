'use server';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import fs from 'fs/promises';
import path from 'path';
import { ImageFile } from '@/app/types/files';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
          `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

const publicDirectory = path.join(process.cwd(), 'public');
const customersDirectory = path.join(publicDirectory, 'customers');

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Please enter name'),
  email: z.string().min(1, 'Please enter email'),
  image_url: z.string().min(1, 'Image URL is required'),
});

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
};
const CreateCustomer = CustomerFormSchema.omit({ id: true, date: true });

export async function createCustomer(
  prevState: CustomerState,
  formData: FormData,
) {
  // Extract fields from formData
  const name = formData.get('name');
  const email = formData.get('email');
  // This will be either FormDataEntryValue<ImageFile> | null
  const imageFile = formData.get('image_url');

  // Validate fields first
  const validatedFields = CreateCustomer.safeParse({
    name,
    email,
    image_url: imageFile ? 'placeholder' : '',
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customers.',
    };
  }

  let relativeImagePath = null;
  if (imageFile) {
    const imgFile = imageFile as ImageFile;
    if (!imgFile.name.toLowerCase().endsWith('.png')) {
      return {
        errors: {
          ...prevState.errors,
          image_url: ['Only PNG files are allowed'],
        },
        message: 'Invalid file format. Only PNG files are allowed.',
      };
    }

    // Ensure the customers directory exists
    await fs.mkdir(customersDirectory, { recursive: true });

    // Generate a unique file name to prevent overwriting images
    const fileName = `${new Date().getTime()}-${imgFile.name}`;
    const savedImagePath = path.join(customersDirectory, fileName);

    // Write the file
    const fileData = new Uint8Array(await imgFile.arrayBuffer());
    await fs.writeFile(savedImagePath, fileData);

    // Set the relative path for storing in the database
    relativeImagePath = `/customers/${fileName}`;
  } else {
    // Handle case where image file is not provided
    return {
      errors: { ...prevState.errors, image_url: ['Image file is required'] },
      message: 'Missing Fields. Failed to Create Customers.',
    };
  }

  // If everything is fine, proceed to insert into the database
  const { name: validatedName, email: validatedEmail } = validatedFields.data;

  try {
    await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${validatedName}, ${validatedEmail}, ${relativeImagePath})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}
