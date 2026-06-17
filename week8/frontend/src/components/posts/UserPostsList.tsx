
import { useAppSelector } from "../../redux/hooks";
import PostCard from "./PostCard";

const UserPostsList = () => {
  const { userPosts } = useAppSelector((state) => state.posts);

  return (
    <>
      {userPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </>
  );
};

export default UserPostsList;