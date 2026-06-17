
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser, clearError } from "../../redux/slices/authSlice";
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
  margin-bottom: 6px;
  outline: none;
  transition: border 0.2s ease;

  &:focus {
    border-color: #4338ca;
  }
`;

const ErrorText = styled.p`
  color: #ef4444;
  font-size: 13px;
  margin-bottom: 14px;
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
  margin-top: 10px;

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
  const authError = useAppSelector((state) => state.auth.error);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const validate = () => {
    let newErrors = { email: "", password: "" };
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/home");
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <AuthTabs />

      <Heading>Welcome Back</Heading>
      <SubText>Enter your details to access your account</SubText>

      <Label>Email address</Label>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <ErrorText>{errors.email}</ErrorText>}

      <Label>Password</Label>
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <ErrorText>{errors.password}</ErrorText>}

      {authError && <ServerError>{authError}</ServerError>}

      <Button type="submit">Sign In</Button>

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