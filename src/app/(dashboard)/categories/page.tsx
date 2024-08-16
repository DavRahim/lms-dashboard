"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {};

const categories1 = [
  { _id: 1, title: "Programming" },
  { _id: 2, title: "React js" },
  { _id: 3, title: "Next js14" },
  { _id: 5, title: "Express js" },
]

const Page = (props: Props) => {
  const [categories, setCategories] = useState<any>([]);
  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      // toast.error("Category title cannot be empty")
      console.log("Category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }])
    }
  }
  useEffect(()=>{
    setCategories(categories1)
  },[])
  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) => prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    )

  }
  return (
    <section className="col-span-10">
      <h1 className={`text-[24px] font-bold text-center my-4`}>All Categories</h1>
      {
        categories && categories.map((item: any, index: number) => {
          return (
            <div className="p-3" key={index}>
              <div className="flex items-center w-full justify-center">
                <Input type="email" placeholder="Email" value={item.title} onChange={(e) => handleCategoriesAdd(item._id, e.target.value)} />
                <Trash className="dark:text-white text-black text-[18px] cursor-pointer w-5 h-5" onClick={() => { setCategories((prevCategory: any) => prevCategory.filter((i: any) => i._id !== item._id)) }} />
              </div>
            </div>
          )
        })
      }
      <br />
      <br />
      <div className="w-full flex justify-center">
        <PlusCircle className="dark:text-white text-black text-[25px] cursor-pointer w-5 h-5" onClick={newCategoriesHandler} />
      </div>
      <Button>Button</Button>

    </section>
  );
};

export default Page;
