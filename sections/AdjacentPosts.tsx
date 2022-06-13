import { useEffect, useState } from "react";
import { getAdjacentPosts } from "../services";
import { AdjacentPostCard } from "../components";
import { AdjacentPosts } from "../components/types/post";

type Props = {
  slug: string;
  createdAt: string;
};

const AdjacentPosts: React.FC<Props> = ({ slug, createdAt }) => {
  const [adjacentPosts, setAdjacentPost] = useState<AdjacentPosts>();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getAdjacentPosts(createdAt, slug).then((res) => {
      setAdjacentPost(res);
      setDataLoaded(true);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-12 mb-8">
        {dataLoaded && (
          <>
            {adjacentPosts?.previous && (
              <div
                className={`${
                  adjacentPosts.next
                    ? "col-span-1 lg:col-span-4"
                    : "col-span-1 lg:col-span-8"
                } adjacent-post rounded-lg relative h-72`}
              >
                <AdjacentPostCard
                  post={adjacentPosts.previous}
                  position="LEFT"
                />
              </div>
            )}
            {adjacentPosts?.next && (
              <div
                className={`${
                  adjacentPosts.previous
                    ? "col-span-1 lg:col-span-4"
                    : "col-span-1 lg:col-span-8"
                } adjacent-post rounded-lg relative h-72`}
              >
                <AdjacentPostCard post={adjacentPosts.next} position="RIGHT" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdjacentPosts;
