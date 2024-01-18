import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { Metadata } from 'next';
import CustomerForm from '@/app/ui/customers/create-form';
import UserForm from '@/app/ui/users/create-form';

export const metadata: Metadata = {
  title: 'Create Customer',
};
export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customer', href: '/dashboard/users' },
          {
            label: 'Create Customer',
            href: '/dashboard/users/create',
            active: true,
          },
        ]}
      />
      <UserForm customers={customers} />
    </main>
  );
}
