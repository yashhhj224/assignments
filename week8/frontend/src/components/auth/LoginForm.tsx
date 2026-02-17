
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ErrorMessage from "../common/ErrorMessage";
import {
  isValidEmail,
  normalizeEmail,
  normalizeText
} from "../../utils/validators";

import {
  AuthButton,
  AuthForm,
  AuthFormTitle,
  AuthFormWrapper,
  AuthInput,
  AuthLabel
} from "../../styles/components/authFormStyles";

type LoginFormState = {
  email: string;
  password: string;
  error: string | null;
};

const LoginForm = () => {
  const { loginUser, authError, clearAuthError, isAuthLoading } = useAuth();

  const [state, setState] = useState<LoginFormState>({
    email: "",
    password: "",
    error: null
  });

  const handleChange = (field: keyof LoginFormState, value: string) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
      error: null
    }));
  };

  const validateForm = (): boolean => {
    const email = normalizeEmail(state.email);
    const password = normalizeText(state.password);

    if (!email || !password) {
      setState((prev) => ({
        ...prev,
        error: "Email and password are required"
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

    if (password.length < 6) {
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

    await loginUser({
      email: normalizeEmail(state.email),
      password: normalizeText(state.password)
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
    <AuthFormWrapper>
      <AuthFormTitle>Login</AuthFormTitle>

      <AuthForm onSubmit={handleSubmit}>
        {state.error ? <ErrorMessage message={state.error} /> : null}

        <div>
          <AuthLabel>Email</AuthLabel>
          <AuthInput
            type="email"
            value={state.email}
            placeholder="Enter your email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <AuthLabel>Password</AuthLabel>
          <AuthInput
            type="password"
            value={state.password}
            placeholder="Enter your password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <AuthButton disabled={isAuthLoading} type="submit">
          {isAuthLoading ? "Logging in..." : "Login"}
        </AuthButton>
      </AuthForm>
    </AuthFormWrapper>
  );
};

export default LoginForm;
