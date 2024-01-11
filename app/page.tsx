import AcmeLogo from '@/app/ui/acme-logo';

import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <AcmeLogo />
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        Welcome to InvoiceVault
      </h1>
      <p className="mb-6 max-w-2xl text-center text-lg text-gray-700">
        Your one-stop solution for managing and storing customer invoices. Easy
        to use, secure, and efficient, InvoiceVault helps you keep track of all
        your billing needs in one place.
      </p>

      <Link
        href="/login"
        className=" rounded-lg bg-blue-500 px-10 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        <span>Log in</span>
      </Link>
    </div>
  );
}
