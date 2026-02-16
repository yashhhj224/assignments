
import type { User } from "./user";

export type Post = {
  _id: string;
  author: User;
  title: string;
  content: string;
  images: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreatePostRequestBody = {
  title: string;
  content: string;
  images?: string[];
  tags?: string[];
};

export type UpdatePostRequestBody = {
  title?: string;
  content?: string;
  images?: string[];
  tags?: string[];
};
