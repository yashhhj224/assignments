import { useState, useEffect } from "react";
import { loginUser } from "../api/apiClient";
import { saveAuthData, isUserLoggedIn } from "../utils/authHelper";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { validateEmail, validatePassword } from "../utils/validators";
import { AuthContainer, AuthTitle, AuthForm, AuthButton, AuthFooter } from "../styles/AuthStyles";

export default function LoginPage() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const trimmedEmail = emailAddress.trim();

    if (!validateEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 6 characters and include uppercase, lowercase and number."
      );
      return;
    }

    try {
      const response = await loginUser({ emailAddress: trimmedEmail, password });
      saveAuthData(response.token, response.user);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <AuthContainer>
      <AuthTitle>Login</AuthTitle>

      <ErrorMessage message={errorMessage} />

      <AuthForm onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email (example@gmail.com)"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <AuthButton type="submit" $variant="login">
          Login
        </AuthButton>
      </AuthForm>

      <AuthFooter>
        New user? <Link to="/register">Register</Link>
      </AuthFooter>
    </AuthContainer>
  );
}
