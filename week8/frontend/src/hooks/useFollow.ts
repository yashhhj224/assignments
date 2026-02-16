
import { useContext } from "react";
import { FollowContext } from "../features/follow/followContext";

export const useFollow = () => {
  const context = useContext(FollowContext);

  if (!context) {
    throw new Error("useFollow must be used inside FollowProvider");
  }

  return context;
};
