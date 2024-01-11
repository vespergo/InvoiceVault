import { InboxStackIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src='/InvoiceVault.png' alt="InvoiceVault Logo" width={150} height={150} />
      
    </div>
  );
}
