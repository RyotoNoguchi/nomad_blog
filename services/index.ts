import { request, gql } from "graphql-request";
import { Category } from "../components/types/category";
import { Post, FeaturedPost, AdjacentPost } from "../components/types/post";
import { Comment } from "../components/types/comment";
import axios from "axios";

declare var process: {
  env: {
    NEXT_PUBLIC_GRAPHCMS_ENDPOINT: string;
  };
};
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

type Result = {
  posts: Post[];
};

type NodeProp = {
  node: Post;
};

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
      assetsConnection {
        edges {
          node {
            id
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  const edges: NodeProp[] = result.postsConnection.edges;
  const posts = edges.map((edge) => edge.node);
  return posts;
};

type Node = {
  post: Post;
};

export const getPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          bio
          name
          id
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          name
          slug
        }
        content {
          raw
        }
      }
    }
  `;
  const node: Node = await request(graphqlAPI, query, { slug });
  return node.post;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ){
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result: Result = await request(graphqlAPI, query);
  return result.posts;
};

export const getSimilarPosts = async (categories: string[], slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result: Result = await request(graphqlAPI, query, { categories, slug });
  return result.posts;
};

type CategoryResponse = {
  categories: Category[];
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;

  const result: CategoryResponse = await request(graphqlAPI, query);
  return result.categories;
};

export const submitComment = async (obj: Comment) => {
  await axios.post("/api/comments", obj);
};

type GetCommentsResponse = {
  comments: Comment[];
};

export const getComments = async (slug: string) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const response: GetCommentsResponse = await request(graphqlAPI, query, {
    slug,
  });
  return response.comments;
};

type GetFeaturedPostsResponse = {
  posts: FeaturedPost[];
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const response: GetFeaturedPostsResponse = await request(graphqlAPI, query);
  return response.posts;
};

type GetAdjacentPostsResponse = {
  next: AdjacentPost[];
  previous: AdjacentPost[];
};

export const getAdjacentPosts = async (createdAt: string, slug: string) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result: GetAdjacentPostsResponse = await request(graphqlAPI, query, {
    slug,
    createdAt,
  });
  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug: string) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.postsConnection.edges;
};
