
export type FollowState = {
  followingIds: string[];
  isLoading: boolean;
  error: string | null;
};

export type FollowAction =
  | {
      type: "FOLLOW_LOADING_START";
    }
  | {
      type: "FOLLOW_LOADING_END";
    }
  | {
      type: "SET_FOLLOWING_IDS";
      payload: {
        followingIds: string[];
      };
    }
  | {
      type: "FOLLOW_USER";
      payload: {
        userId: string;
      };
    }
  | {
      type: "UNFOLLOW_USER";
      payload: {
        userId: string;
      };
    }
  | {
      type: "FOLLOW_ERROR";
      payload: {
        message: string;
      };
    }
  | {
      type: "CLEAR_FOLLOW_ERROR";
    };
