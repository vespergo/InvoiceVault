import AcmeLogo from '@/app/ui/acme-logo';

import Link from 'next/link';



export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <AcmeLogo />
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
                Welcome to InvoiceVault
            </h1>
            <p className="text-lg text-gray-700 text-center max-w-2xl mb-6">
                Your one-stop solution for managing and storing customer invoices.
                Easy to use, secure, and efficient, InvoiceVault helps you keep track of
                all your billing needs in one place.
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
