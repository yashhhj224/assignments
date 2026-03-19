
import styled from "styled-components";
import { useAppSelector, useAppDispatch  } from "../../redux/hooks";
import UserLink from "../common/UserLink";
import FollowButton from "../common/FollowButton";
import { createOrGetConversationApi } from "../../api/chatApi";
import { addConversation, setActiveConversation } from "../../redux/slices/chatSlice";
import { useNavigate } from "react-router-dom";

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

  const allUsers = useAppSelector((state) => state.users.users);

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

      const followersIds = allUsers
        .filter((user: any) =>
          user.following?.some((f: any) =>
            typeof f === "string"
              ? f === currentUser?._id
              : f?._id === currentUser?._id
          )
        )
        .map((u: any) => u._id);

      safeList = safeList.filter((u: any) =>
        followersIds.includes(u._id)
      );
    }

    if (filter === "following") {

      safeList = safeList.filter((u: any) =>
        currentUser?.following?.some((f: any) =>
          typeof f === "string"
            ? f === u._id
            : f?._id === u._id
        )
      );
    }
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMessage = async (userId: string) => {
    const res = await createOrGetConversationApi(userId);

    if (!res?.data) return;

    dispatch(addConversation(res.data));

    dispatch(
      setActiveConversation({
        conversationId: res.data._id,
        currentUserId: res.data.participants?.[0]?._id,
      })
    );

    navigate("/chat");
  };

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

          <div className="flex gap-2">
            <button
              onClick={() => handleMessage(user._id)}
              className="px-3 py-1 rounded-md bg-gray-100 text-sm hover:bg-gray-200 transition"
            >
              Message
            </button>

            <FollowButton userId={user._id} />
          </div>
        </UserRow>
      ))}
    </Wrapper>
  );
};

export default FollowersFollowingList;