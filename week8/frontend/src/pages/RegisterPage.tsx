
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { useAuth } from "../hooks/useAuth";

import {
  AuthPageBottomText,
  AuthPageLinkText,
  AuthPageWrapper
} from "../styles/pages/authPageStyles";

const RegisterPage = () => {
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
        <RegisterForm />
        <AuthPageBottomText>
          Already have an account?{" "}
          <AuthPageLinkText onClick={() => navigate("/login")}>
            Login
          </AuthPageLinkText>
        </AuthPageBottomText>
      </div>
    </AuthPageWrapper>
  );
};

export default RegisterPage;
