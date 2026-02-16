
import styled from "styled-components";

type PostImageGalleryProps = {
  images: string[];
};

const Gallery = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
  margin-top: 12px;
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #ddd;
`;

const PostImageGallery = ({ images }: PostImageGalleryProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Gallery>
      {images.map((imageUrl) => (
        <Image key={imageUrl} src={imageUrl} alt="post" />
      ))}
    </Gallery>
  );
};

export default PostImageGallery;
