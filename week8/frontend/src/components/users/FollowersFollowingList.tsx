
import styled from "styled-components";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { followUser, unfollowUser } from "../../redux/slices/followSlice";
import UserLink from "../common/UserLink";

const Wrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 250px;
  padding: 8px 14px;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
`;

const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #f1f5f9;
`;

const FollowBtn = styled.button<{ $following?: boolean }>`
  padding: 6px 14px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  background: ${({ $following }) =>
    $following ? "#e5e7eb" : "#4338ca"};
  color: ${({ $following }) =>
    $following ? "#374151" : "white"};
`;

type Props = {
  type: "followers" | "following" | "all";
  users?: any[];
};

const FollowersFollowingList = ({ type, users }: Props) => {
  const dispatch = useAppDispatch();

  const selectedUser = useAppSelector(
    (state) => state.users.selectedUser
  );

  const currentUser = useAppSelector(
    (state) => state.auth.user
  );

  const [search, setSearch] = useState("");

  let rawList: any[] = [];

  if (type === "all") {
    rawList = users || [];
  } else if (type === "followers") {
    rawList = selectedUser?.followers || [];
  } else {
    rawList = selectedUser?.following || [];
  }

  const safeList = rawList.filter(
    (u: any) =>
      typeof u === "object" &&
      u?._id &&
      u?._id !== currentUser?._id
  );

  const filtered = safeList.filter((user: any) =>
    user.username
      ?.toLowerCase()
      ?.includes(search.toLowerCase())
  );

  return (
    <Wrapper>
      <TopBar>
        <h3>
          {type === "followers"
            ? "Followers"
            : type === "following"
            ? "Following"
            : "Users"}
        </h3>

        <SearchInput
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </TopBar>

      {filtered.map((user: any) => {
        const isFollowing =
          currentUser?.following?.some(
            (f: any) =>
              (typeof f === "string"
                ? f
                : f._id) === user._id
          );

        return (
          <UserRow key={user._id}>
            <UserLink user={user} />

            <FollowBtn
              $following={isFollowing}
              onClick={() =>
                isFollowing
                  ? dispatch(
                      unfollowUser(user._id)
                    )
                  : dispatch(
                      followUser(user._id)
                    )
              }
            >
              {isFollowing
                ? "Unfollow"
                : "Follow"}
            </FollowBtn>
          </UserRow>
        );
      })}
    </Wrapper>
  );
};

export default FollowersFollowingList;