
import styled from "styled-components";

export const PostDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const PostDetailCard = styled.div`
  width: 100%;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PostDetailTitle = styled.h2`
  font-size: 22px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const PostDetailAuthor = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const PostDetailDateText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const PostDetailContent = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
`;

export const PostDetailButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
`;

export const PostDetailPrimaryButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 800;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const PostDetailDangerButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.colors.danger};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 800;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
