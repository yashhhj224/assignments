
import styled from "styled-components";
import type { Post } from "../../types/post";
import { formatDateTime } from "../../utils/formatters";
import { Link } from "react-router-dom";

type PostCardProps = {
  post: Post;
  onDelete?: (postId: string) => void;
  isOwner?: boolean;
};

export const PostCard = ({ post, onDelete, isOwner }: PostCardProps) => {
  const handleDelete = () => {
    if (!onDelete) {
      return;
    }

    onDelete(post._id);
  };

  return (
    <Card>
      <Header>
        <AuthorInfo>
          <Avatar
            src={post.author.profilePic || "https://via.placeholder.com/40"}
            alt={post.author.username}
          />
          <div>
            <AuthorName to={`/users/${post.author._id}`}>
              {post.author.username}
            </AuthorName>
            <PostTime>{formatDateTime(post.createdAt)}</PostTime>
          </div>
        </AuthorInfo>

        {isOwner ? (
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        ) : null}
      </Header>

      <Title to={`/posts/${post._id}`}>{post.title}</Title>

      <Content>{post.content.slice(0, 140)}...</Content>

      {post.images.length > 0 ? (
        <ImagePreview
          src={post.images[0]}
          alt="Post"
        />
      ) : null}

      {post.tags.length > 0 ? (
        <Tags>
          {post.tags.map((tag) => (
            <Tag key={tag}>#{tag}</Tag>
          ))}
        </Tags>
      ) : null}
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid #ddd;
  background: #fff;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
`;

const AuthorName = styled(Link)`
  font-size: 14px;
  font-weight: 700;
  color: #111;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PostTime = styled.p`
  margin: 0;
  font-size: 12px;
  color: #777;
`;

const DeleteButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  background: #ff4d4d;
  color: #fff;

  &:hover {
    opacity: 0.9;
  }
`;

const Title = styled(Link)`
  font-size: 18px;
  font-weight: 800;
  color: #111;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Content = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
  line-height: 1.6;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-height: 260px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #ddd;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 10px;
  background: #f3f3f3;
  color: #111;
`;
