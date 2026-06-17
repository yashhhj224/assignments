
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchPostById,
  toggleLike,
  updatePost,
  deletePost
} from "../../redux/slices/postsSlice";
import UserLink from "../common/UserLink";
import CommentSection from "./CommentSection";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";

const Wrapper = styled.div`
  background: white;
  padding: 40px 44px;
  border-radius: 22px;
  border: 1px solid #f1f1f1;
  box-shadow: 0 12px 28px rgba(0,0,0,0.05);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const TitleWrapper = styled.div`
  flex: 1;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 20px 0 8px 0;
  line-height: 1.4;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.8;
  margin-top: 20px;
  white-space: pre-wrap;
  color: #374151;

  word-break: break-word;
  overflow-wrap: anywhere;
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

const ActionRow = styled.div`
  display: flex;
  gap: 24px;
  margin: 26px 0;
  align-items: center;
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
  font-size: 28px;
  font-weight: 600;
  padding: 14px 18px;
  margin: 16px 0 14px 0;

  border-radius: 14px;
  border: 1px solid #e5e7eb;
  outline: none;
  background: #fafafa;

  transition: all 0.2s ease;

  &:focus {
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }
`;

const EditTextarea = styled.textarea`
  width: 100%;
  min-height: 220px;
  font-size: 16px;
  line-height: 1.8;
  padding: 16px 18px;
  margin-top: 10px;

  border-radius: 16px;
  border: 1px solid #e5e7eb;
  outline: none;
  resize: none;
  background: #fafafa;

  transition: all 0.2s ease;

  &:focus {
    border-color: #6366f1;
    background: white;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }
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

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (selectedPost) {
      setEditTitle(selectedPost.title);
      setEditContent(selectedPost.content);
    }
  }, [selectedPost]);

  useEffect(() => {
    if (isEditing) {
      titleRef.current?.focus();
    }
  }, [isEditing]);

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
      <HeaderRow>
        <TitleWrapper>
          {isEditing ? (
            <>
              <EditInput
                ref={titleRef}
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
            </>
          )}
        </TitleWrapper>

        {isOwner && (
          <HeaderActions>
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
                <ActionButton $danger onClick={handleDelete}>
                  <FiTrash2 size={16} />
                  Delete
                </ActionButton>
              </>
            )}
          </HeaderActions>
        )}
      </HeaderRow>

      {!isEditing && (
        <Content>{selectedPost.content}</Content>
      )}

      {selectedPost.images?.map((img: string, index: number) => (
        <ImageWrapper key={index}>
          <Image src={`http://localhost:5000${img}`} />
        </ImageWrapper>
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
      </ActionRow>

      <CommentSection
        postId={postId}
        autoFocus={location.search.includes("focus=comment")}
      />
    </Wrapper>
  );
};

export default PostDetail;