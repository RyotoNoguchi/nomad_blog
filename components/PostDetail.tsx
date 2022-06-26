import React, { ReactElement } from "react";
import { Post } from "../components/types/post";
import { TypeObject, ChildrenObject } from "../components/types/post";
import Image from "next/image";
import moment from "moment";

const PostDetail: React.FC<{ post: Post }> = ({ post }) => {
  const getTextObject = (index: number, text: string, obj: ChildrenObject) => {
    let modifiedText: string | ReactElement | ReactElement[] = text;

    if (obj) {
      if (obj.type === "list-item" && obj.children.length == 2) {
        modifiedText = obj.children.map((listObj, index) => {
          return (
            <ul className="list-disc ml-6" key={index}>
              {listObj.children[index]?.text && (
                <li>{listObj.children[index]?.text}</li>
              )}
              <ul className="list-disc pl-4">
                {!listObj.children[index]?.text &&
                  listObj.children[0]?.children.map(
                    (list, index: number) => {
                      if (list.children[0].children.length === 3) {
                        return (
                          <li key={index}>
                            <a
                              className="text-blue-600"
                              target="_blank"
                              rel="noreferrer"
                              href={list.children[0].children[1]?.href}
                            >
                              {list.children[0].children[1]?.children[0]?.text}
                            </a>
                            <ul>
                              <li>{list.children[1].children[0].children[0].children[0].children[0].text}</li>
                            </ul>
                          </li>
                        );
                      } else {
                        return (
                          <li key={index}>
                            {list.children[0].children[0].text}
                          </li>
                        );
                      }
                    }
                  )}
              </ul>
            </ul>
          );
        });
      }
    }

    if (obj) {
      if (obj.type === "link") {
        modifiedText = (
          <a
            className="text-blue-600"
            target="_blank"
            rel="noreferrer"
            href={obj.href}
            key={index}
          >
            <span>{obj.children[0].text}</span>
          </a>
        );
      }
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }
    }
    return modifiedText;
  };

  const getContentFragment = (
    index: number,
    text: Object[],
    obj: TypeObject,
    type: string
  ) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText[index] = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText[index] = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText[index] = <u key={index}>{text}</u>;
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        if (typeof modifiedText === "object") {
          return (
            <p key={index} className="mb-8">
              {modifiedText.map((item, i: number) => (
                <React.Fragment key={i}>{item}</React.Fragment>
              ))}
            </p>
          );
        }
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i: number) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          obj?.type === "image" && (
            <Image
              key={index}
              alt={obj.title}
              height={obj.height}
              width={obj.width}
              src={obj.src ?? ""}
            />
          )
        );
      default:
        return modifiedText;
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden mb-6 text-center">
        <Image
          alt={post.title}
          src={post.featuredImage.url}
          width={800}
          height={500}
          className="object-top h-full w-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex items-center lg:mb-0 mr-8">
            <Image
              src={post.author.photo.url}
              alt={post.author.name}
              width={30}
              height={30}
              className="align-middle rounded-full"
            />
            <p className="inline align-middle text-gray-700 ml-2 text-lg">
              {post.author.name}
            </p>
          </div>
          <div className="font-medium text-gray-700 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item) => {
            return getTextObject(index, item.text, item);
          });
          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
    </div>
  );
};

export default PostDetail;
