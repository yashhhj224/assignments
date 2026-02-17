
import styled from "styled-components";

export const ProfilePageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ProfileCard = styled.div`
  width: 100%;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProfileLeft = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const ProfileAvatar = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  object-fit: cover;
`;

export const ProfileAvatarPlaceholder = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight};

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 900;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ProfileUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ProfileUsername = styled.div`
  font-size: 22px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ProfileEmail = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProfileStats = styled.div`
  display: flex;
  gap: 14px;
  font-size: 13px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProfileSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const ProfileLoadMoreButton = styled.button`
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
