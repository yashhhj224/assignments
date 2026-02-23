
import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import AuthTabs from "./AuthTabs";

const Container = styled.div`
  width: 380px;
`;

const Heading = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;
`;

const SubText = styled.p`
  color: #64748b;
  margin-bottom: 30px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
  outline: none;
  transition: border 0.2s ease;

  &:focus {
    border-color: #4338ca;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: none;
  background: #4338ca;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #3730a3;
  }
`;

const SwitchText = styled.p`
  margin-top: 20px;
  font-size: 14px;
`;

const SwitchLink = styled.span`
  color: #4338ca;
  cursor: pointer;
  font-weight: 600;
`;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/home");
    }
  };

  return (
    <Container>
      <AuthTabs />

      <Heading>Welcome Back</Heading>
      <SubText>Enter your details to access your account</SubText>

      <Label>Email address</Label>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />

      <Label>Password</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={handleSubmit}>Sign In</Button>

      <SwitchText>
        Don't have an account?{" "}
        <SwitchLink onClick={() => navigate("/register")}>
          Create an account
        </SwitchLink>
      </SwitchText>
    </Container>
  );
};

export default LoginForm;