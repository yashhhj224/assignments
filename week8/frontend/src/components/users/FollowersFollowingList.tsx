
import styled from "styled-components";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import UserLink from "../common/UserLink";
import FollowButton from "../common/FollowButton";

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

type Props = {
  type: "followers" | "following" | "all";
  users?: any[];
};

const FollowersFollowingList = ({ type, users }: Props) => {
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

      {filtered.map((user: any) => (
        <UserRow key={user._id}>
          <UserLink user={user} />
          <FollowButton userId={user._id} />
        </UserRow>
      ))}
    </Wrapper>
  );
};

export default FollowersFollowingList;