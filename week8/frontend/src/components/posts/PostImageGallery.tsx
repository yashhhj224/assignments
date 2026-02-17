
import { resolveImageUrl } from "../../utils/url";
import {
  PostGallery,
  PostGalleryImage
} from "../../styles/components/postGalleryStyles";

type PostImageGalleryProps = {
  images: string[];
};

const PostImageGallery = ({ images }: PostImageGalleryProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <PostGallery>
      {images.map((imageUrl) => (
        <PostGalleryImage
          key={imageUrl}
          src={resolveImageUrl(imageUrl)}
          alt="post"
        />
      ))}
    </PostGallery>
  );
};

export default PostImageGallery;
