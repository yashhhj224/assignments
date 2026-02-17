
import styled from "styled-components";

export const FeedPageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const FeedPageTitle = styled.h2`
  font-size: 22px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const FeedPageLoadMoreButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight};
  cursor: pointer;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
