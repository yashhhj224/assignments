
export type AuthUser = {
  id: string;
  username: string;
  email: string;
  profilePic: string;
  following: string[];
  followers: string[];
};

export type RegisterRequestBody = {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
};

export type LoginRequestBody = {
  email: string;
  password: string;
};

export type AuthResponseData = {
  token: string;
  user: AuthUser;
};
