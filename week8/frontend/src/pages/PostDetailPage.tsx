
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FeedLayout from "../components/layout/FeedLayout";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import PostImageGallery from "../components/posts/PostImageGallery";
import { usePosts } from "../hooks/usePosts";
import { formatDateTime } from "../utils/formatters";
import { useAuth } from "../hooks/useAuth";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Card = styled.div`
  width: 100%;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid #ddd;
  background: #fff;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 900;
`;

const Author = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #111;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const DateText = styled.div`
  font-size: 12px;
  color: #777;
`;

const Content = styled.p`
  font-size: 15px;
  color: #333;
  line-height: 1.7;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

const PrimaryButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #111;
  color: white;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const DangerButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: #ff4d4d;
  color: white;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

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
      <Wrapper>
        {error ? <ErrorMessage message={error} /> : null}

        {isLoading && !selectedPost ? <Loader /> : null}

        {selectedPost ? (
          <Card>
            <Title>{selectedPost.title}</Title>

            <Author onClick={handleAuthorClick}>
              @{selectedPost.author.username}
            </Author>

            <DateText>{formatDateTime(selectedPost.createdAt)}</DateText>

            <Content>{selectedPost.content}</Content>

            <PostImageGallery images={selectedPost.images} />

            {canEditOrDelete ? (
              <ButtonRow>
                <PrimaryButton onClick={handleEdit}>Edit</PrimaryButton>
                <DangerButton onClick={handleDelete}>Delete</DangerButton>
              </ButtonRow>
            ) : null}
          </Card>
        ) : null}
      </Wrapper>
    </FeedLayout>
  );
};

export default PostDetailPage;
