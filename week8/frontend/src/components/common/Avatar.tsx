
import styled from "styled-components";
import { DEFAULT_AVATAR } from "../../constants/assets";

const Image = styled.img<{ size?: number }>`
  width: ${({ size }) => size || 40}px;
  height: ${({ size }) => size || 40}px;
  border-radius: 50%;
  object-fit: cover;
  image-rendering: auto;
  backface-visibility: hidden;
  transform: translateZ(0);
`;

type Props = {
  src?: string | null;
  size?: number;
};

const Avatar: React.FC<Props> = ({ src, size }) => {
  const imageSrc =
    src && src.trim() !== ""
      ? `http://localhost:5000/${src.replace(/^\/+/, "")}`
      : DEFAULT_AVATAR;

  return (
    <Image
      src={imageSrc}
      size={size}
      onError={(e) => {
        e.currentTarget.src = DEFAULT_AVATAR;
      }}
    />
  );
};

export default Avatar;