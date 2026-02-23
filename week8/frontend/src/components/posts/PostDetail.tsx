
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchPostById,
  toggleLike,
  updatePost,
  deletePost
} from "../../redux/slices/postsSlice";
import UserLink from "../common/UserLink";
import CommentSection from "./CommentSection";
import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";

const Wrapper = styled.div`
  max-width: 800px;
  margin: auto;
  background: white;
  padding: 40px;
  border-radius: 12px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 16px;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 30px;
  white-space: pre-wrap;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 12px;
  margin: 20px 0;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 20px 0;
`;

const IconButton = styled.span<{ $liked?: boolean }>`
  cursor: pointer;
  font-size: 22px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  color: ${({ $liked }) => ($liked ? "#e11d48" : "#6b7280")};

  &:hover {
    transform: scale(1.1);
  }
`;

const EditInput = styled.input`
  width: 100%;
  font-size: 24px;
  margin-bottom: 10px;
  padding: 10px;
`;

const EditTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 14px;
  margin-bottom: 10px;
  resize: none;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  transition: all 0.2s ease;

  color: ${({ $danger }) => ($danger ? "#e11d48" : "#374151")};

  &:hover {
    background: ${({ $danger }) =>
      $danger ? "rgba(225,29,72,0.1)" : "rgba(0,0,0,0.05)"};
  }
`;

type Props = {
  postId: string;
};

const PostDetail = ({ postId }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const selectedPost = useAppSelector(
    (state) => state.posts.selectedPost
  );

  const user = useAppSelector((state) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (selectedPost) {
      setEditTitle(selectedPost.title);
      setEditContent(selectedPost.content);
    }
  }, [selectedPost]);

  if (!selectedPost) return null;

  const isOwner =
    user && selectedPost.author
      ? user._id === selectedPost.author._id
      : false;

  const handleLike = () => {
    dispatch(toggleLike(postId));
  };

  const handleUpdate = async () => {
    const result = await dispatch(
      updatePost({
        postId,
        title: editTitle,
        content: editContent,
        tags: selectedPost.tags || [],
        images: selectedPost.images || []
      })
    );

    if (updatePost.fulfilled.match(result)) {
      setIsEditing(false); 
    }
  };

  const handleCancel = () => {
    setEditTitle(selectedPost.title);
    setEditContent(selectedPost.content);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await dispatch(deletePost(postId));
    navigate("/home");
  };

  return (
    <Wrapper>
      {isEditing ? (
        <>
          <EditInput
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <EditTextarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        </>
      ) : (
        <>
          <Title>{selectedPost.title}</Title>
          <UserLink user={selectedPost.author} />
          <Content>{selectedPost.content}</Content>
        </>
      )}

      {selectedPost.images?.map((img: string, index: number) => (
        <Image
          key={index}
          src={`http://localhost:5000${img}`}
        />
      ))}

      <ActionRow>
        <IconButton
          $liked={!!selectedPost.isLikedByCurrentUser}
          onClick={handleLike}
        >
          {selectedPost.isLikedByCurrentUser ? <FaHeart /> : <FiHeart />}
        </IconButton>

        <span>{selectedPost.likesCount}</span>

        <IconButton>
          <FaRegComment />
        </IconButton>

        <span>{selectedPost.commentsCount}</span>
        {isOwner && (
          <>
            {isEditing ? (
              <>
                <ActionButton onClick={handleUpdate}>
                  <FiSave size={16} />
                  Save
                </ActionButton>

                <ActionButton onClick={handleCancel}>
                  <FiX size={16} />
                  Cancel
                </ActionButton>
              </>
            ) : (
              <>
                <ActionButton onClick={() => setIsEditing(true)}>
                  <FiEdit2 size={16} />
                  Edit
                </ActionButton>

                <ActionButton
                  $danger
                  onClick={handleDelete}
                >
                  <FiTrash2 size={16} />
                  Delete
                </ActionButton>
              </>
            )}
          </>
        )}
      </ActionRow>

      <CommentSection
        postId={postId}
        autoFocus={location.search.includes("focus=comment")}
      />
    </Wrapper>
  );
};

export default PostDetail;