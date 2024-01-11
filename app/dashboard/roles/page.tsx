import { Metadata } from "next";
import { Suspense } from "react";
import {
  PlusIcon
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import RoleTable from "@/app/ui/roles/Table";
import { Button } from "@/app/ui/button";

export const metadata: Metadata = {
  title: 'User Roles',
};
export default async function Page() {

    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>User Roles</h1>

          <Button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" >
            <PlusIcon className="ml-auto h-5 w-5 text-gray-50" /> Add Role
          </Button>
        </div>
         <div>
          <RoleTable />
         </div>
      </div>
    );
  }