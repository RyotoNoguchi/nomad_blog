import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "../services";
import { Category } from "./types/category";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";

const Header: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const matches = useMediaQuery("(min-width:768px)");
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="flex align-middle justify-center md:justify-between border-b w-full border-blue-400 py-8">
        {matches ? (
          <Link href="/" passHref>
            <a>
              <Image
                alt="logo"
                height={30}
                width={300}
                src="/logo_lg.png"
                className="cursor-pointer"
              />
            </a>
          </Link>
        ) : (
          <Link href="/" passHref>
            <a>
              <Image
                alt="logo"
                height={100}
                width={400}
                src="/logo.png"
                className="cursor-pointer"
              />
            </a>
          </Link>
        )}
        {matches && (
          <div className="">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                passHref
              >
                <a>
                  <span className=" align-middle text-white ml-4 font-semibold cursor-pointer">
                    {category.name}
                  </span>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
