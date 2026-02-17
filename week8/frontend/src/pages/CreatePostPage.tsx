
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedLayout from "../components/layout/FeedLayout";
import ErrorMessage from "../components/common/ErrorMessage";
import { PostForm } from "../components/posts/PostForm";
import { usePosts } from "../hooks/usePosts";
import { useUpload } from "../hooks/useUpload";
import { normalizeTags, normalizeText } from "../utils/validators";

import { PostFormPageWrapper } from "../styles/pages/postFormPageStyles";

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { createPost, isLoading, error } = usePosts();
  const { uploadImages, isUploading } = useUpload();

  const [values, setValues] = useState({
    title: "",
    content: "",
    tags: ""
  });

  const [images, setImages] = useState<string[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSelectImages = async (files: File[]) => {
    setLocalError(null);

    const uploaded = await uploadImages(files);

    if (uploaded.length > 0) {
      setImages((prev) => [...prev, ...uploaded]);
    }
  };

  const handleSubmit = async () => {
    setLocalError(null);

    const title = normalizeText(values.title);
    const content = normalizeText(values.content);

    if (!title || !content) {
      setLocalError("Title and content are required");
      return;
    }

    console.log("IMAGES BEING SENT:", images);

    const createdPost = await createPost({
      title,
      content,
      tags: normalizeTags(values.tags.split(",")),
      images
    });

    if (createdPost) {
      navigate(`/posts/${createdPost._id}`);
    }
  };

  return (
    <FeedLayout>
      <PostFormPageWrapper>
        {error ? <ErrorMessage message={error} /> : null}
        {localError ? <ErrorMessage message={localError} /> : null}

        <PostForm
          values={values}
          onChange={setValues}
          onSubmit={handleSubmit}
          isSubmitting={isLoading || isUploading}
          submitText="Create Post"
          onSelectImages={handleSelectImages}
          selectedImagesCount={images.length}
        />
      </PostFormPageWrapper>
    </FeedLayout>
  );
};

export default CreatePostPage;
