
import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { createPost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import TagsInput from "./TagsInput";
import ImageUploader from "./ImageUploader";
import { VALIDATION_RULES } from "../../constants/validation";

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 36px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 30px;
  font-weight: 700;
  padding: 18px 22px;
  border-radius: 18px;
  border: 1px solid #e5e7eb;
  outline: none;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 380px;
  margin-top: 20px;
  padding: 22px;
  font-size: 16px;
  line-height: 1.6;
  border-radius: 20px;
  border: 1px solid #e5e7eb;
  resize: none;
  outline: none;
  transition: all 0.2s ease;
  background: white;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
  }
  
  @media (max-width: 768px) {
    min-height: 280px;
  }
`;

const ErrorText = styled.div`
  color: #e11d48;
  font-size: 14px;
  margin-top: 8px;
`;

const Panel = styled.div`
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  width: 300px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const PostButton = styled.button`
  padding: 16px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #4338ca, #6366f1);
  color: white;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  box-shadow: 0 10px 22px rgba(67, 56, 202, 0.25);
  transition: all 0.2s ease;
  width: 300px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(67, 56, 202, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const PostEditor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  const validate = () => {
    if (title.trim().length < VALIDATION_RULES.POST_TITLE_MIN_LENGTH) {
      return `Title must be at least ${VALIDATION_RULES.POST_TITLE_MIN_LENGTH} characters`;
    }

    if (content.trim().length < VALIDATION_RULES.POST_CONTENT_MIN_LENGTH) {
      return `Content must be at least ${VALIDATION_RULES.POST_CONTENT_MIN_LENGTH} characters`;
    }

    return null;
  };

  const handlePost = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const formattedImages = images.map((img) => {
      let path = img;

      if (path.startsWith("http")) {
        path = new URL(path).pathname;
      }

      path = path.trim();

      if (!path.startsWith("/uploads/")) {
        path = path.replace(/^\/?uploads\/?/, "");
        path = `/uploads/${path}`;
      }

      return path.toLowerCase();
    });

    const result = await dispatch(
      createPost({
        title: title.trim(),
        content: content.trim(),
        tags,
        images: formattedImages
      })
    );

    if (createPost.fulfilled.match(result)) {
      navigate("/home");
    }
  };

  return (
    <Wrapper>
      <Left>
        <TitleInput
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {title &&
          title.trim().length <
            VALIDATION_RULES.POST_TITLE_MIN_LENGTH && (
            <ErrorText>
              Minimum {VALIDATION_RULES.POST_TITLE_MIN_LENGTH} characters required
            </ErrorText>
          )}

        <TextArea
          placeholder="Write your description here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {content &&
          content.trim().length <
            VALIDATION_RULES.POST_CONTENT_MIN_LENGTH && (
            <ErrorText>
              Minimum {VALIDATION_RULES.POST_CONTENT_MIN_LENGTH} characters required
            </ErrorText>
          )}

        {error && <ErrorText>{error}</ErrorText>}
      </Left>

      <Right>
        <Panel>
          <ImageUploader onUpload={setImages} />
        </Panel>

        <Panel>
          <TagsInput tags={tags} setTags={setTags} />
        </Panel>

        <PostButton onClick={handlePost}>
          POST
        </PostButton>
      </Right>
    </Wrapper>
  );
};

export default PostEditor;