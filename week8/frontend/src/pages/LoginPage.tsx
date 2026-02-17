
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";

import {
  AuthPageBottomText,
  AuthPageLinkText,
  AuthPageWrapper
} from "../styles/pages/authPageStyles";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <AuthPageWrapper>
      <div>
        <LoginForm />
        <AuthPageBottomText>
          Don't have an account?{" "}
          <AuthPageLinkText onClick={() => navigate("/register")}>
            Register
          </AuthPageLinkText>
        </AuthPageBottomText>
      </div>
    </AuthPageWrapper>
  );
};

export default LoginPage;
