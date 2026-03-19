
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { uploadImages } from "../../redux/slices/postsSlice";

const Box = styled.label`
  border: 2px dashed #c7d2fe;
  padding: 40px 20px;
  text-align: center;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: block;

  &:hover {
    border-color: #6366f1;
    background: #f8fafc;
  }

  input {
    display: none;
  }
`;

type Props = {
  onUpload: (images: string[]) => void;
};

const ImageUploader = ({ onUpload }: Props) => {
  const dispatch = useAppDispatch();

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const result = await dispatch(uploadImages(files));

    if (uploadImages.fulfilled.match(result)) {
      onUpload(result.payload);
    }
  };

  return (
    <Box>
      <input type="file" multiple onChange={handleFile} />
      <p>Upload Images</p>
      <small>Click to select files</small>
    </Box>
  );
};

export default ImageUploader;