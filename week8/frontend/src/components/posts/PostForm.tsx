
import styled from "styled-components";

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
    <FormContainer>
      <Field>
        <Label>Title</Label>
        <Input
          value={values.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter post title"
        />
      </Field>

      <Field>
        <Label>Content</Label>
        <TextArea
          value={values.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          placeholder="Write something..."
        />
      </Field>

      <Field>
        <Label>Tags (comma separated)</Label>
        <Input
          value={values.tags}
          onChange={(e) => handleInputChange("tags", e.target.value)}
          placeholder="example: health, fitness, coding"
        />
      </Field>

      <Field>
        <Label>Images</Label>
        <FileInput type="file" multiple accept="image/*" onChange={handleImageChange} />
        <ImageInfo>
          {selectedImagesCount > 0
            ? `${selectedImagesCount} image(s) selected`
            : "No images selected"}
        </ImageInfo>
      </Field>

      <SubmitButton disabled={isSubmitting} onClick={onSubmit}>
        {isSubmitting ? "Submitting..." : submitText}
      </SubmitButton>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid #ddd;
  background: #fff;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #111;
`;

const Input = styled.input`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #111;
  }
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 14px;
  outline: none;
  min-height: 160px;
  resize: vertical;

  &:focus {
    border-color: #111;
  }
`;

const FileInput = styled.input`
  font-size: 14px;
`;

const ImageInfo = styled.p`
  margin: 0;
  font-size: 12px;
  color: #666;
`;

const SubmitButton = styled.button`
  padding: 12px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  background: #111;
  color: #fff;

  &:hover {
    background: #333;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
