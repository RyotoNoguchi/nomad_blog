import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Category } from "./types/category";
import { getCategories } from "../services";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
      getCategories().then((newCategories) => setCategories(newCategories))
  }, [])
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        Categories
      </h3>
      {categories.map((category) => (
        // eslint-disable-next-line @next/next/link-passhref
        <Link href={`/category/${category.slug}`} key={category.slug}>
          <span className='cursor-pointer block pb-3 mb-3'>
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Categories
