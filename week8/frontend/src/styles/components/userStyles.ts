
import styled from "styled-components";

export const FollowButtonWrapper = styled.button<{ $isFollowing: boolean }>`
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;
  border: 1px solid
    ${({ $isFollowing, theme }) =>
      $isFollowing ? theme.colors.danger : theme.colors.primary};

  background: ${({ $isFollowing, theme }) =>
    $isFollowing ? theme.colors.danger : theme.colors.primary};

  color: ${({ theme }) => theme.colors.textPrimary};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const UserCardWrapper = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const UserCardLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserCardAvatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  object-fit: cover;
`;

export const UserCardAvatarPlaceholder = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight};

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 900;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const UserCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

export const UserCardUsername = styled.div`
  font-size: 15px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const UserCardEmail = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const UserCardStats = styled.div`
  display: flex;
  gap: 12px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 4px;
`;
