
import { useEffect, useRef } from "react";
import { useFollow } from "../../hooks/useFollow";
import UserCard from "./UserCard";
import Loader from "../common/Loader";

type Props = {
  userId: string;
  type: "followers" | "following";
  onClose: () => void;
};

const FollowListModal = ({ userId, type, onClose }: Props) => {
  const {
    followersList,
    followingList,
    fetchFollowersByUserId,
    fetchFollowingByUserId,
    isLoading,
    followUser,
    unfollowUser,
    isFollowing
  } = useFollow();

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (type === "followers") {
      fetchFollowersByUserId(userId);
    } else {
      fetchFollowingByUserId(userId);
    }
  }, [type, userId, fetchFollowersByUserId, fetchFollowingByUserId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const users =
    type === "followers" ? followersList : followingList;

  return (
    <div style={overlayStyle}>
      <div ref={modalRef} style={modalStyle}>
        <h3 style={{ marginBottom: "16px" }}>
          {type === "followers" ? "Followers" : "Following"}
        </h3>

        {isLoading && <Loader />}

        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              isFollowing={isFollowing(user._id)}
              isLoading={false}
              onFollow={() => followUser(user._id)}
              onUnfollow={() => unfollowUser(user._id)}
            />
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: "16px",
            padding: "8px 12px",
            cursor: "pointer"
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FollowListModal;

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modalStyle: React.CSSProperties = {
  background: "#111827",
  padding: "24px",
  borderRadius: "12px",
  width: "400px",
  maxWidth: "90%",
  maxHeight: "80vh",
  overflow: "hidden"
};
