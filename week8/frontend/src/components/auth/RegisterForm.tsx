
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerUser, clearError } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import AuthTabs from "./AuthTabs";

const Container = styled.form`
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

const ServerError = styled.p`
  color: #ef4444;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
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

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authError = useAppSelector((state) => state.auth.error);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(
      registerUser({ username, email, password })
    );

    if (registerUser.fulfilled.match(result)) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <AuthTabs />

      <Heading>Create Account</Heading>
      <SubText>Enter your details to create an account</SubText>

      <Label>Username</Label>
      <Input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <Label>Email address</Label>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Label>Password</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {authError && <ServerError>{authError}</ServerError>}

      <Button type="submit">Create Account</Button>

      <SwitchText>
        Already have an account?{" "}
        <SwitchLink onClick={() => navigate("/login")}>
          Login
        </SwitchLink>
      </SwitchText>
    </Container>
  );
};

export default RegisterForm;
