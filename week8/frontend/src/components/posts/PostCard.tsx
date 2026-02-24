
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
  padding: 28px 32px;
  border-radius: 20px;
  margin-bottom: 28px;
  transition: all 0.2s ease;
  border: 1px solid #f1f1f1;

  &:hover {
    box-shadow: 0 12px 28px rgba(0,0,0,0.06);
    transform: translateY(-2px);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MetaTime = styled.span`
  font-size: 13px;
  color: #9ca3af;
`;

const Title = styled.h2`
  margin: 18px 0 12px 0;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1.4;
`;

const Content = styled.p`
  color: #4b5563;
  line-height: 1.7;
  font-size: 15px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 420px;
  margin-top: 20px;
  border-radius: 20px;
  overflow: hidden;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
`;

const Footer = styled.div`
  display: flex;
  gap: 28px;
  align-items: center;
  margin-top: 22px;
  color: #6b7280;
  font-size: 14px;
`;

const ActionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
`;

type Props = {
  post: any;
};

const PostCard = ({ post }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const previewContent =
    post.content.length > 160
      ? post.content.slice(0, 160) + "..."
      : post.content;

  return (
    <Card>
      <Header>
        <UserLink user={post.author} />
        <MetaTime>{timeAgo(post.createdAt)}</MetaTime>
      </Header>

      <Title onClick={() => navigate(`/post/${post._id}`)}>
        {post.title}
      </Title>

      <Content>{previewContent}</Content>

      {post.images?.length > 0 && (
        <ImageWrapper>
          <Image src={`http://localhost:5000${post.images[0]}`} />
        </ImageWrapper>
      )}

      <Footer>
        <ActionItem>
          <IconWrapper
            $liked={!!post.isLikedByCurrentUser}
            onClick={() => dispatch(toggleLike(post._id))}
          >
            {post.isLikedByCurrentUser ? <FaHeart /> : <FiHeart />}
          </IconWrapper>
          <span>{post.likesCount}</span>
        </ActionItem>

        <ActionItem>
          <IconWrapper
            onClick={() =>
              navigate(`/post/${post._id}?focus=comment`)
            }
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