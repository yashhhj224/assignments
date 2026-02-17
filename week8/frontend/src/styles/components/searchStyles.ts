
import styled from "styled-components";

export const SearchWrapper = styled.div`
  position: relative;
  width: 280px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SearchDropdown = styled.div`
  position: absolute;
  top: 45px;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  z-index: 999;
`;

export const SearchItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  gap: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceLight};
  }
`;

export const SearchAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

export const SearchInfo = styled.div`
  flex: 1;
`;

export const SearchUsername = styled.div`
  font-weight: 700;
`;

export const SearchButton = styled.button<{ $isFollowing: boolean }>`
  padding: 6px 10px;
  border-radius: 8px;
  font-weight: 700;
  background: ${({ $isFollowing, theme }) =>
    $isFollowing ? theme.colors.danger : theme.colors.primary};
  color: white;
`;
