"use client"
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Separator } from "@/components/ui/separator";
import { Book, CircleFadingPlus, Layers, LayoutDashboard, Library, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <section className={`min-h-screen`}>
      <MaxWidthWrapper>
        <div className="grid grid-cols-12 mt-10 mb-14">
          <div className="col-span-2 flex">
            <div className="flex flex-col gap-4">
              <Link
                href='/dashboard'
                className="flex items-center py-1 px-[4px] rounded-md hover:bg-[#F4F4F5] dark:hover:text-[#000]">
                <LayoutDashboard className='h-4 w-4 stroke-[3px] text-green-600 mr-5'/>
                Dashboard
              </Link>
              <Link
                href='/courses-analytics'
                className="flex items-center py-1 px-[4px] rounded-md hover:bg-[#F4F4F5] dark:hover:text-[#000]">
                <Layers className='h-4 w-4 stroke-[3px] text-green-600 mr-5' />
                Courses Analytics
              </Link>
              <Link
                href='/users'
                className="flex items-center py-1 px-[4px] rounded-md hover:bg-[#F4F4F5] dark:hover:text-[#000]">
                <Users className='h-4 w-4 stroke-[3px] text-green-600 mr-5' />
                Users
              </Link>
              <Link
                href='/invoices'
                className="flex items-center py-1 px-[4px] rounded-md hover:bg-[#F4F4F5] dark:hover:text-[#000]">
                <Book className='h-4 w-4 stroke-[3px] text-green-600 mr-5' />
                Invoices
              </Link>
              <Link href='/create-course' className="flex items-center py-1 px-[4px] rounded-md hover:bg-[#F4F4F5] dark:hover:text-[#000]">
                <CircleFadingPlus className='h-4 w-4 stroke-[3px] text-green-600 mr-5' />
                Create Course
              </Link>
              <Link href='/courses' className="flex items-center py-1 px-[4px] rounded-md hover:bg-[#F4F4F5] dark:hover:text-[#000]">
                <CircleFadingPlus className='h-4 w-4 stroke-[3px] text-green-600 mr-5' />
                Live Course
              </Link>
              <Link href='/categories' className="flex items-center py-1 px-[4px] rounded-md hover:bg-[#F4F4F5] dark:hover:text-[#000]">
                <Library className='h-4 w-4 stroke-[3px] text-green-600 mr-5' />
                Categories
              </Link>
            </div>
            <Separator className="ml-5" orientation="vertical" />
          </div >
          {children}
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default DashboardLayout;
