
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { uploadImages } from "../../redux/slices/postsSlice";

const Box = styled.div`
  border: 2px dashed #c7d2fe;
  padding: 30px;
  text-align: center;
  border-radius: 12px;
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
    </Box>
  );
};

export default ImageUploader;