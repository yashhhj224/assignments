
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FeedLayout from "../components/layout/FeedLayout";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";
import { PostForm } from "../components/posts/PostForm";
import { usePosts } from "../hooks/usePosts";
import { useUpload } from "../hooks/useUpload";
import { normalizeTags, normalizeText } from "../utils/validators";

import { PostFormPageWrapper } from "../styles/pages/postFormPageStyles";

const EditPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { selectedPost, fetchPostById, updatePost, isLoading, error } =
    usePosts();

  const { uploadImages, isUploading } = useUpload();

  const [values, setValues] = useState({
    title: "",
    content: "",
    tags: ""
  });

  const [images, setImages] = useState<string[]>([]);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;
    fetchPostById(postId);
  }, [postId]);

  useEffect(() => {
    if (!selectedPost) return;

    setValues({
      title: selectedPost.title,
      content: selectedPost.content,
      tags: selectedPost.tags.join(", ")
    });

    setImages(selectedPost.images);
  }, [selectedPost]);

  const handleSelectImages = async (files: File[]) => {
    setLocalError(null);

    const uploaded = await uploadImages(files);

    if (uploaded.length > 0) {
      setImages((prev) => [...prev, ...uploaded]);
    }
  };

  const handleSubmit = async () => {
    if (!postId) return;

    setLocalError(null);

    const title = normalizeText(values.title);
    const content = normalizeText(values.content);

    if (!title || !content) {
      setLocalError("Title and content are required");
      return;
    }

    const updatedPost = await updatePost(postId, {
      title,
      content,
      tags: normalizeTags(values.tags.split(",")),
      images
    });

    if (updatedPost) {
      navigate(`/posts/${updatedPost._id}`);
    }
  };

  if ((isLoading || isUploading) && !selectedPost) {
    return (
      <FeedLayout>
        <Loader />
      </FeedLayout>
    );
  }

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
          submitText="Update Post"
          onSelectImages={handleSelectImages}
          selectedImagesCount={images.length}
        />
      </PostFormPageWrapper>
    </FeedLayout>
  );
};

export default EditPostPage;
