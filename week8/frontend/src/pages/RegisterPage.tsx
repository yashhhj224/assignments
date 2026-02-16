
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import RegisterForm from "../components/auth/RegisterForm";
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
  color: #666;
`;

const LinkText = styled.span`
  color: #3b82f6;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const RegisterPage = () => {
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
        <RegisterForm />
        <BottomText>
          Already have an account?{" "}
          <LinkText onClick={() => navigate("/login")}>Login</LinkText>
        </BottomText>
      </div>
    </Wrapper>
  );
};

export default RegisterPage;
