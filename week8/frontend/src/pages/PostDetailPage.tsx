
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedLayout from "../components/layout/FeedLayout";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import PostImageGallery from "../components/posts/PostImageGallery";
import { usePosts } from "../hooks/usePosts";
import { formatDateTime } from "../utils/formatters";
import { useAuth } from "../hooks/useAuth";

import {
  PostDetailAuthor,
  PostDetailButtonRow,
  PostDetailCard,
  PostDetailContent,
  PostDetailDangerButton,
  PostDetailDateText,
  PostDetailPrimaryButton,
  PostDetailTitle,
  PostDetailWrapper
} from "../styles/pages/postDetailPageStyles";

const PostDetailPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { authUser } = useAuth();
  const { selectedPost, fetchPostById, isLoading, error, deletePost } =
    usePosts();

  useEffect(() => {
    if (!postId) return;
    fetchPostById(postId);
  }, [postId]);

  const handleAuthorClick = () => {
    if (!selectedPost) return;
    navigate(`/profile/${selectedPost.author._id}`);
  };

  const handleEdit = () => {
    if (!selectedPost) return;
    navigate(`/edit-post/${selectedPost._id}`);
  };

  const handleDelete = async () => {
    if (!selectedPost) return;

    const deleted = await deletePost(selectedPost._id);

    if (deleted) {
      navigate("/", { replace: true });
    }
  };

  const canEditOrDelete = selectedPost?.author._id === authUser?.id;

  return (
    <FeedLayout>
      <PostDetailWrapper>
        {error ? <ErrorMessage message={error} /> : null}

        {isLoading && !selectedPost ? <Loader /> : null}

        {selectedPost ? (
          <PostDetailCard>
            <PostDetailTitle>{selectedPost.title}</PostDetailTitle>

            <PostDetailAuthor onClick={handleAuthorClick}>
              @{selectedPost.author.username}
            </PostDetailAuthor>

            <PostDetailDateText>
              {formatDateTime(selectedPost.createdAt)}
            </PostDetailDateText>

            <PostDetailContent>{selectedPost.content}</PostDetailContent>

            <PostImageGallery images={selectedPost.images} />

            {canEditOrDelete ? (
              <PostDetailButtonRow>
                <PostDetailPrimaryButton onClick={handleEdit}>
                  Edit
                </PostDetailPrimaryButton>
                <PostDetailDangerButton onClick={handleDelete}>
                  Delete
                </PostDetailDangerButton>
              </PostDetailButtonRow>
            ) : null}
          </PostDetailCard>
        ) : null}
      </PostDetailWrapper>
    </FeedLayout>
  );
};

export default PostDetailPage;
