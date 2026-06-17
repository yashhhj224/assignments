
import styled from "styled-components";
import { DEFAULT_AVATAR } from "../../constants/assets";

const Image = styled.img<{ size?: number }>`
  width: ${({ size }) => size || 40}px;
  height: ${({ size }) => size || 40}px;
  border-radius: 50%;
  object-fit: cover;
`;

type Props = {
  src?: string | null;
  size?: number;
};

const Avatar: React.FC<Props> = ({ src, size }) => {
  let imageSrc = DEFAULT_AVATAR;

  if (src && src.trim() !== "") {
    if (src.startsWith("http") || src.startsWith("/")) {
      imageSrc = src;
    } else {
      imageSrc = `http://localhost:5000/${src.replace(/^\/+/, "")}`;
    }
  }

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
