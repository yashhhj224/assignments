
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";
import ErrorMessage from "../common/ErrorMessage";
import { isValidEmail, isValidPassword, isValidUsername, normalizeEmail, normalizeText } from "../../utils/validators";

const Wrapper = styled.div`
  width: 100%;
  max-width: 420px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: 700;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
`;

type RegisterFormState = {
  username: string;
  email: string;
  password: string;
  profilePic: string;
  error: string | null;
};

const RegisterForm = () => {
  const { registerUser, authError, clearAuthError, isAuthLoading } = useAuth();

  const [state, setState] = useState<RegisterFormState>({
    username: "",
    email: "",
    password: "",
    profilePic: "",
    error: null
  });

  const handleChange = (field: keyof RegisterFormState, value: string) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
      error: null
    }));
  };

  const validateForm = (): boolean => {
    const username = normalizeText(state.username);
    const email = normalizeEmail(state.email);
    const password = normalizeText(state.password);

    if (!username || !email || !password) {
      setState((prev) => ({
        ...prev,
        error: "Username, email and password are required"
      }));
      return false;
    }

    if (!isValidUsername(username)) {
      setState((prev) => ({
        ...prev,
        error: "Username must be at least 3 characters"
      }));
      return false;
    }

    if (!isValidEmail(email)) {
      setState((prev) => ({
        ...prev,
        error: "Invalid email format"
      }));
      return false;
    }

    if (!isValidPassword(password)) {
      setState((prev) => ({
        ...prev,
        error: "Password must be at least 6 characters"
      }));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    clearAuthError();

    if (!validateForm()) {
      return;
    }

    await registerUser({
      username: normalizeText(state.username),
      email: normalizeEmail(state.email),
      password: normalizeText(state.password),
      profilePic: state.profilePic ? normalizeText(state.profilePic) : ""
    });
  };

  useEffect(() => {
    if (authError) {
      setState((prev) => ({
        ...prev,
        error: authError
      }));
    }
  }, [authError]);

  return (
    <Wrapper>
      <Title>Register</Title>

      <Form onSubmit={handleSubmit}>
        {state.error ? <ErrorMessage message={state.error} /> : null}

        <div>
          <Label>Username</Label>
          <Input
            type="text"
            value={state.username}
            placeholder="Enter username"
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            value={state.email}
            placeholder="Enter email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            value={state.password}
            placeholder="Enter password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <div>
          <Label>Profile Picture URL (Optional)</Label>
          <Input
            type="text"
            value={state.profilePic}
            placeholder="Paste image url"
            onChange={(e) => handleChange("profilePic", e.target.value)}
          />
        </div>

        <Button disabled={isAuthLoading} type="submit">
          {isAuthLoading ? "Creating account..." : "Register"}
        </Button>
      </Form>
    </Wrapper>
  );
};

export default RegisterForm;
