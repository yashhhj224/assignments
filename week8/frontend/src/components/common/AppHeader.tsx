
import { useNavigate } from "react-router-dom";
import { APP_CONSTANTS } from "../../constants/appConstants";
import { useAuth } from "../../hooks/useAuth";
import {
  Brand,
  HeaderWrapper,
  PrimaryButton,
  RightSection,
  SecondaryButton,
  UserText
} from "../../styles/components/layoutStyles";

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
            <SecondaryButton onClick={handleLogout}>
              Logout
            </SecondaryButton>
          </>
        ) : (
          <PrimaryButton onClick={() => navigate("/login")}>
            Login
          </PrimaryButton>
        )}
      </RightSection>
    </HeaderWrapper>
  );
};

export default AppHeader;
