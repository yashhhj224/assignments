
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ErrorMessage from "../common/ErrorMessage";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
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
    <AuthFormWrapper>
      <AuthFormTitle>Register</AuthFormTitle>

      <AuthForm onSubmit={handleSubmit}>
        {state.error ? <ErrorMessage message={state.error} /> : null}

        <div>
          <AuthLabel>Username</AuthLabel>
          <AuthInput
            type="text"
            value={state.username}
            placeholder="Enter username"
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </div>

        <div>
          <AuthLabel>Email</AuthLabel>
          <AuthInput
            type="email"
            value={state.email}
            placeholder="Enter email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <AuthLabel>Password</AuthLabel>
          <AuthInput
            type="password"
            value={state.password}
            placeholder="Enter password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <div>
          <AuthLabel>Profile Picture URL (Optional)</AuthLabel>
          <AuthInput
            type="text"
            value={state.profilePic}
            placeholder="Paste image url"
            onChange={(e) => handleChange("profilePic", e.target.value)}
          />
        </div>

        <AuthButton disabled={isAuthLoading} type="submit">
          {isAuthLoading ? "Creating account..." : "Register"}
        </AuthButton>
      </AuthForm>
    </AuthFormWrapper>
  );
};

export default RegisterForm;
