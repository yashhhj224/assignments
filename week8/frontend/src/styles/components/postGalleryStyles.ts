
import styled from "styled-components";

export const PostGallery = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px;
  margin-top: 12px;
`;

export const PostGalleryImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;
