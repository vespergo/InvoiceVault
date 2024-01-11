import { Metadata } from "next";
import { Suspense } from "react";
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Tax settings',
};
export default async function Page() {

    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Tax settings</h1>
        </div>
         <div>
          
         </div>
      </div>
    );
  }