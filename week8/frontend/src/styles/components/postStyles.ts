
import styled from "styled-components";
import { Link } from "react-router-dom";

export const PostCardWrapper = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PostCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PostCardAuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PostCardAvatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const PostCardAuthorName = styled(Link)`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PostCardTime = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const PostCardDeleteButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    opacity: 0.9;
  }
`;

export const PostCardTitle = styled(Link)`
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const PostCardContent = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

export const PostCardImagePreview = styled.img`
  width: 100%;
  max-height: 260px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const PostCardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PostCardTag = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PostFormContainer = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const PostFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const PostFormLabel = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PostFormInput = styled.input`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PostFormTextArea = styled.textarea`
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 14px;
  height: 160px;
  resize: none;
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  overflow-y: auto;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const PostFormFileInput = styled.input`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PostFormImageInfo = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const PostFormSubmitButton = styled.button`
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
