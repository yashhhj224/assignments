
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchComments,
  createComment,
  deleteComment
} from "../../redux/slices/commentsSlice";
import UserLink from "../common/UserLink";

const Wrapper = styled.div`
  margin-top: 40px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
`;

const Input = styled.textarea`
  flex: 1;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  outline: none;
  resize: none;
  min-height: 48px;
`;

const Button = styled.button`
  padding: 10px 18px;
  border-radius: 10px;
  border: none;
  background: #4338ca;
  color: white;
  font-weight: 500;
  cursor: pointer;
`;

const CommentContainer = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 22px;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
`;

const Time = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

const CommentText = styled.div`
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const DeleteText = styled.span`
  font-size: 12px;
  color: #e11d48;
  cursor: pointer;
  margin-left: 12px;
`;

type Props = {
  postId: string;
  autoFocus?: boolean;
};

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const created = new Date(dateString);
  const diff = Math.floor((now.getTime() - created.getTime()) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return created.toLocaleDateString();
};

const CommentSection = ({ postId, autoFocus }: Props) => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.comments);
  const user = useAppSelector((state) => state.auth.user);

  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }, [autoFocus]);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    const result = await dispatch(
      createComment({ postId, content: text })
    );

    if (createComment.fulfilled.match(result)) {
      setText("");
      inputRef.current?.focus();
    }
  };

  return (
    <Wrapper>
      <InputRow>
        <Input
          ref={inputRef}
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button onClick={handleSubmit}>Comment</Button>
      </InputRow>

      {comments
        ?.filter((c: any) => c && c._id)
        .map((comment: any) => {
          const isOwner =
            user &&
            comment.user &&
            user._id === comment.user._id;

          return (
            <CommentContainer key={comment._id}>
              <ContentWrapper>
                <TopRow>
                  <UserLink user={comment.user} />

                  <Time>
                    {formatTimeAgo(comment.createdAt)}
                  </Time>

                  {isOwner && (
                    <DeleteText
                      onClick={() =>
                        dispatch(
                          deleteComment({
                            commentId: comment._id
                          })
                        )
                      }
                    >
                      Delete
                    </DeleteText>
                  )}
                </TopRow>

                <CommentText>
                  {comment.content}
                </CommentText>
              </ContentWrapper>
            </CommentContainer>
          );
        })}
    </Wrapper>
  );
};

export default CommentSection;