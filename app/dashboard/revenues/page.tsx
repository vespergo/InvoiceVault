import { Metadata } from "next";
import { fetchFilteredCustomers, fetchFilteredRevenue } from "@/app/lib/data";
import { Suspense } from "react";
import CustomersTable from "@/app/ui/customers/table";
import Pagination from "@/app/ui/invoices/pagination";
import RevenueTable from "@/app/ui/revenues/DataTable";

export const metadata: Metadata = {
  title: 'Revenues',
};
export default async function Page({searchParams}: {searchParams?: {query?: string; page?: string}}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 1;
  //const revenues = await fetchFilteredCustomers(query);
  const revenues: any = await fetchFilteredRevenue(query);

    return (
      <div className="w-full">
     <Suspense 
     key={query + currentPage} 
     >
      <RevenueTable revenues={revenues} />
    </Suspense>
    <div className="mt-5 flex w-full justify-center">
      <Pagination totalPages={totalPages} />
    </div>
  </div>
    );
  }