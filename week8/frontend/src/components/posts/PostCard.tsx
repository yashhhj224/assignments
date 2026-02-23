
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { toggleLike } from "../../redux/slices/postsSlice";
import UserLink from "../common/UserLink";
import { timeAgo } from "../../utils/time";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaRegComment } from "react-icons/fa";

const Card = styled.div`
  background: white;
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.04);
  transition: 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  margin: 12px 0;
  font-size: 22px;
  cursor: pointer;
`;

const Content = styled.p`
  color: #4b5563;
  margin-bottom: 14px;
  line-height: 1.6;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 12px;
  margin: 12px 0;
  object-fit: cover;
`;

const Footer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  margin-top: 12px;
  font-weight: 500;
  color: #6b7280;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const IconWrapper = styled.span<{ $liked?: boolean }>`
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  color: ${({ $liked }) => ($liked ? "#e11d48" : "#6b7280")};

  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(1.2);
  }
`;

type Props = {
  post: any;
};

const PostCard = ({ post }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNavigate = () => {
    navigate(`/post/${post._id}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(post._id));
  };

  const previewContent =
    post.content.length > 140
      ? post.content.slice(0, 140) + "..."
      : post.content;

  return (
    <Card>
      <Header>
        <UserLink user={post.author} />
        <span>{timeAgo(post.createdAt)}</span>
      </Header>

      <Title onClick={handleNavigate}>
        {post.title}
      </Title>

      <Content>{previewContent}</Content>

      {post.images?.length > 0 && (
        <Image src={`http://localhost:5000${post.images[0]}`} />
      )}

      <Footer>
        <ActionItem>
          <IconWrapper
            $liked={!!post.isLikedByCurrentUser}
            onClick={handleLike}
          >
            {post.isLikedByCurrentUser ? <FaHeart /> : <FiHeart />}
          </IconWrapper>

          <span>{post.likesCount}</span>
        </ActionItem>

        <ActionItem>
          <IconWrapper
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/post/${post._id}?focus=comment`);
            }}
          >
            <FaRegComment />
          </IconWrapper>

          <span>{post.commentsCount}</span>
        </ActionItem>
      </Footer>
    </Card>
  );
};

export default PostCard;