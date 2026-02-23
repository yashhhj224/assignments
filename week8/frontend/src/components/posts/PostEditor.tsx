
import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { createPost } from "../../redux/slices/postsSlice";
import { useNavigate } from "react-router-dom";
import TagsInput from "./TagsInput";
import ImageUploader from "./ImageUploader";
import { VALIDATION_RULES } from "../../constants/validation";

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
`;

const Left = styled.div`
  flex: 2;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 28px;
  font-weight: 600;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 6px;
  outline: none;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 350px;
  padding: 20px;
  font-size: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  resize: none;
  outline: none;
  margin-bottom: 6px;
`;

const ErrorText = styled.div`
  color: #e11d48;
  font-size: 14px;
  margin-bottom: 12px;
`;

const Panel = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
`;

const PostButton = styled.button`
  padding: 14px;
  border: none;
  border-radius: 10px;
  background: #4338ca;
  color: white;
  font-weight: 600;
  cursor: pointer;
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