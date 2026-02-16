
import { useContext } from "react";
import { PostsContext } from "../features/posts/postsContext";

export const usePosts = () => {
  const context = useContext(PostsContext);

  if (!context) {
    throw new Error("usePosts must be used inside PostsProvider");
  }

  return context;
};
