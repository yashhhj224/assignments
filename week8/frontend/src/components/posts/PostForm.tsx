
import {
  PostFormContainer,
  PostFormField,
  PostFormFileInput,
  PostFormImageInfo,
  PostFormInput,
  PostFormLabel,
  PostFormSubmitButton,
  PostFormTextArea
} from "../../styles/components/postStyles";

type PostFormValues = {
  title: string;
  content: string;
  tags: string;
};

type PostFormProps = {
  values: PostFormValues;
  onChange: (values: PostFormValues) => void;
  onSubmit: () => void;

  isSubmitting: boolean;
  submitText?: string;

  onSelectImages: (files: File[]) => void;
  selectedImagesCount: number;
};

export const PostForm = ({
  values,
  onChange,
  onSubmit,
  isSubmitting,
  submitText = "Submit",
  onSelectImages,
  selectedImagesCount
}: PostFormProps) => {
  const handleInputChange = (key: keyof PostFormValues, value: string) => {
    onChange({
      ...values,
      [key]: value
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    onSelectImages(Array.from(files));
  };

  return (
    <PostFormContainer>
      <PostFormField>
        <PostFormLabel>Title</PostFormLabel>
        <PostFormInput
          value={values.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter post title"
        />
      </PostFormField>

      <PostFormField>
        <PostFormLabel>Content</PostFormLabel>
        <PostFormTextArea
          value={values.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          placeholder="Write something..."
        />
      </PostFormField>

      <PostFormField>
        <PostFormLabel>Tags (comma separated)</PostFormLabel>
        <PostFormInput
          value={values.tags}
          onChange={(e) => handleInputChange("tags", e.target.value)}
          placeholder="example: health, fitness, coding"
        />
      </PostFormField>

      <PostFormField>
        <PostFormLabel>Images</PostFormLabel>
        <PostFormFileInput
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <PostFormImageInfo>
          {selectedImagesCount > 0
            ? `${selectedImagesCount} image(s) selected`
            : "No images selected"}
        </PostFormImageInfo>
      </PostFormField>

      <PostFormSubmitButton disabled={isSubmitting} onClick={onSubmit}>
        {isSubmitting ? "Submitting..." : submitText}
      </PostFormSubmitButton>
    </PostFormContainer>
  );
};
