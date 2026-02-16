
import { useContext } from "react";
import { UsersContext } from "../features/users/usersContext";

export const useUsersContext = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsersContext must be used inside UsersProvider");
  }

  return context;
};
