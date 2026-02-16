
export type User = {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
  following: string[];
  followers: string[];
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileRequestBody = {
  username?: string;
  profilePic?: string;
};
