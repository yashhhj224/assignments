
import styled from "styled-components";

export const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: calc(100vh - 70px);
`;

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

export const Brand = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const UserText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const PrimaryButton = styled.button`
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

export const SecondaryButton = styled.button`
  padding: 10px 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

export const SidebarWrapper = styled.aside`
  width: 260px;
  min-height: calc(100vh - 70px);
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SidebarButton = styled.button`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 600;
  text-align: left;

  &:hover {
    opacity: 0.9;
  }
`;
