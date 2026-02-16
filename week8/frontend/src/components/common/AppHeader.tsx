
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { APP_CONSTANTS } from "../../constants/appConstants";
import { useAuth } from "../../hooks/useAuth";

const HeaderWrapper = styled.header`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const Brand = styled.div`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const UserText = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Button = styled.button`
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

const LogoutButton = styled.button`
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

const AppHeader = () => {
  const navigate = useNavigate();
  const { authUser, logoutUser, isAuthenticated } = useAuth();

  const handleBrandClick = () => {
    if (isAuthenticated) {
      navigate("/");
      return;
    }

    navigate("/login");
  };

  const handleProfileClick = () => {
    if (!authUser) return;
    navigate(`/profile/${authUser.id}`);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <HeaderWrapper>
      <Brand onClick={handleBrandClick}>{APP_CONSTANTS.APP_NAME}</Brand>

      <RightSection>
        {isAuthenticated && authUser ? (
          <>
            <UserText>@{authUser.username}</UserText>
            <Button onClick={handleProfileClick}>Profile</Button>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </>
        ) : (
          <Button onClick={() => navigate("/login")}>Login</Button>
        )}
      </RightSection>
    </HeaderWrapper>
  );
};

export default AppHeader;
