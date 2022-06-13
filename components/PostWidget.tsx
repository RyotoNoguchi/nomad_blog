import React, { useState, useEffect } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getSimilarPosts } from "../services";
import Image from "next/image";

type Props = {
  categories?: string[];
  slug?: string;
};

type Post = {
  title: string;
  featuredImage: FeaturedImage;
  createdAt: string;
  slug: string;
};

type FeaturedImage = {
  url: string;
};

const PostWidget: React.FC<Props> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories ?? [], slug).then((result) =>
        setRelatedPosts(result)
      );
    } else {
      getRecentPosts().then((result) => setRelatedPosts(result));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-8 mb-8 ">
        <h3 className="text-xl mb-8 font-semibold border-b pb-4">
          {slug ? "Related Posts" : "Recent Posts"}
        </h3>

        {relatedPosts?.map((post) => (
          <div key={post.title} className="flex items-center w-full mb-4">
            <div className="w-16 flex-none">
              <Image
                alt={post.title}
                src={post.featuredImage.url}
                width={60}
                height={60}
                className="align-middle rounded-full"
              />
            </div>
            <div className="flex-grow ml-4">
              <p className="text-gray-500 font-xs">
                {moment(post.createdAt).format("MMM DD, YYYY")}
              </p>
              <Link href={`/post/${post.slug}`} key={post.title}>{post.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostWidget;
