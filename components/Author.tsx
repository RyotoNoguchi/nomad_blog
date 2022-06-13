import Image from "next/image";
import React from "react";
import { Author } from "./types/post";

const Author: React.FC<{ author: Author }> = ({ author }) => {
  return ( 
    <div className="text-center h-48 mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <div className="absolute left-0 right-0 -top-10">
        <Image
          alt={author.name}
          height={80}
          width={80}
          src={author.photo.url}
          className="align-middle rounded-full"
        />
      </div>
      <h3 className="text-white my-0 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-base">{author.bio}</p>
    </div>
  );
};

export default Author;
