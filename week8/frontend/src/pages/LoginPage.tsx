
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 26px;
`;

const BottomText = styled.div`
  margin-top: 14px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LinkText = styled.span`
  color: #3b82f6;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <Wrapper>
      <div>
        <LoginForm />
        <BottomText>
          Don't have an account?{" "}
          <LinkText onClick={() => navigate("/register")}>Register</LinkText>
        </BottomText>
      </div>
    </Wrapper>
  );
};

export default LoginPage;
