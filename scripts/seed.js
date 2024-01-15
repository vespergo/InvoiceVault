require('dotenv').config();

const sqlite3 = require('sqlite3');
const {
  invoices,
  customers,
  revenue,
  users,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function createTables(client) {
  await client.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT(lower(hex(randomblob(4))) || '-'
          || lower(hex(randomblob(2))) || '-4'
          || substr(lower(hex(randomblob(2))), 2) || '-a'
          || substr(lower(hex(randomblob(2))), 2) || '-'
          || lower(hex(randomblob(6)))),
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);

  await client.exec(`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY DEFAULT(lower(hex(randomblob(4))) || '-'
          || lower(hex(randomblob(2))) || '-4'
          || substr(lower(hex(randomblob(2))), 2) || '-a'
          || substr(lower(hex(randomblob(2))), 2) || '-'
          || lower(hex(randomblob(6)))),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `);

  await client.exec(`
        CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY DEFAULT(lower(hex(randomblob(4))) || '-'
          || lower(hex(randomblob(2))) || '-4'
          || substr(lower(hex(randomblob(2))), 2) || '-a'
          || substr(lower(hex(randomblob(2))), 2) || '-'
          || lower(hex(randomblob(6)))),
        customer_id UUID NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(255) NOT NULL,
        date DATE NOT NULL
      );
    `);

  await client.exec(`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `);
}
async function seedUsers(client) {
  try {
    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.run(
          `
          INSERT INTO users (id, name, email, password)
          VALUES (?, ?, ?, ?)
          ON CONFLICT (id) DO NOTHING;
        `,
          [user.id, user.name, user.email, hashedPassword],
        );
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedCustomers(client) {
  try {
    // Insert data into the "customers" table
    const insertedCustomers = await Promise.all(
      customers.map((customer) =>
        client.run(
          `
        INSERT INTO customers (id, name, email, image_url)
        VALUES (?, ?, ?, ?)
        ON CONFLICT (id) DO NOTHING;
      `,
          [customer.id, customer.name, customer.email, customer.image_url],
        ),
      ),
    );

    console.log(`Seeded ${insertedCustomers.length} customers`);

    return {
      customers: insertedCustomers,
    };
  } catch (error) {
    console.error('Error seeding customers:', error);
    throw error;
  }
}

async function seedInvoices(client) {
  try {
    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map((invoice) =>
        client.run(
          `
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (?, ?, ?, ?)
        ON CONFLICT (id) DO NOTHING;
      `,
          [invoice.customer_id, invoice.amount, invoice.status, invoice.date],
        ),
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function seedRevenue(client) {
  try {
    // Insert data into the "revenue" table
    const insertedRevenue = await Promise.all(
      revenue.map((rev) =>
        client.run(
          `
        INSERT INTO revenue (month, revenue)
        VALUES (?, ?)
        ON CONFLICT (month) DO NOTHING;
      `,
          [rev.month, rev.revenue],
        ),
      ),
    );

    console.log(`Seeded ${insertedRevenue.length} revenue`);

    return {
      revenue: insertedRevenue,
    };
  } catch (error) {
    console.error('Error seeding revenue:', error);
    throw error;
  }
}

async function main() {
  const client = new sqlite3.Database(process.env.DATABASE_URL);

  try {
    await createTables(client);
    await seedUsers(client);
    await seedCustomers(client);
    await seedInvoices(client);
    await seedRevenue(client);

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database');
  } finally {
    client.close();
  }
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
