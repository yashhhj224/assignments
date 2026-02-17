
import type { Post } from "../../types/post";
import { formatDateTime } from "../../utils/formatters";
import { resolveImageUrl } from "../../utils/url";
import {
  PostCardAuthorInfo,
  PostCardAuthorName,
  PostCardAvatar,
  PostCardContent,
  PostCardDeleteButton,
  PostCardHeader,
  PostCardImagePreview,
  PostCardTag,
  PostCardTags,
  PostCardTime,
  PostCardTitle,
  PostCardWrapper
} from "../../styles/components/postStyles";

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
    <PostCardWrapper>
      <PostCardHeader>
        <PostCardAuthorInfo>
          <PostCardAvatar
            src={
              post.author.profilePic
                ? resolveImageUrl(post.author.profilePic)
                : "https://via.placeholder.com/40"
            }
            alt={post.author.username}
          />
          <div>
            <PostCardAuthorName to={`/users/${post.author._id}`}>
              {post.author.username}
            </PostCardAuthorName>
            <PostCardTime>{formatDateTime(post.createdAt)}</PostCardTime>
          </div>
        </PostCardAuthorInfo>

        {isOwner ? (
          <PostCardDeleteButton onClick={handleDelete}>
            Delete
          </PostCardDeleteButton>
        ) : null}
      </PostCardHeader>

      <PostCardTitle to={`/posts/${post._id}`}>{post.title}</PostCardTitle>

      <PostCardContent>{post.content.slice(0, 140)}...</PostCardContent>

      {post.images.length > 0 ? (
        <PostCardImagePreview src={resolveImageUrl(post.images[0])} alt="Post" />
      ) : null}

      {post.tags.length > 0 ? (
        <PostCardTags>
          {post.tags.map((tag) => (
            <PostCardTag key={tag}>#{tag}</PostCardTag>
          ))}
        </PostCardTags>
      ) : null}
    </PostCardWrapper>
  );
};
