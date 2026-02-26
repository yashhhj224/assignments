
import styled from "styled-components";
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
  filter?: "all" | "followers" | "following";
};

const FollowersFollowingList = ({ type, users, filter }: Props) => {
  const selectedUser = useAppSelector(
    (state) => state.users.selectedUser
  );

  const currentUser = useAppSelector(
    (state) => state.auth.user
  );

  let rawList: any[] = [];

  if (type === "all") {
    rawList = users || [];
  } else if (type === "followers") {
    rawList = selectedUser?.followers || [];
  } else {
    rawList = selectedUser?.following || [];
  }

  let safeList = rawList.filter(
    (u: any) =>
      typeof u === "object" &&
      u?._id &&
      u?._id !== currentUser?._id
  );

  if (type === "all" && filter && filter !== "all") {
    if (filter === "followers") {
      safeList = safeList.filter((u: any) =>
        currentUser?.followers?.some(
          (f: any) => f._id === u._id
        )
      );
    } else {
      safeList = safeList.filter((u: any) =>
        currentUser?.following?.some(
          (f: any) => f._id === u._id
        )
      );
    }
  }

  return (
    <Wrapper>
      {type !== "all" && (
        <TopBar>
          <h3>
            {type === "followers"
              ? "Followers"
              : "Following"}
          </h3>
        </TopBar>
      )}

      {safeList.map((user: any) => (
        <UserRow key={user._id}>
          <UserLink user={user} />
          <FollowButton userId={user._id} />
        </UserRow>
      ))}
    </Wrapper>
  );
};

export default FollowersFollowingList;