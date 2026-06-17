import { useState, useEffect } from "react";
import { registerUser } from "../api/apiClient";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { validateEmail, validatePassword, validateFullName } from "../utils/validators";
import { isUserLoggedIn } from "../utils/authHelper";
import { AuthContainer, AuthTitle, AuthForm, AuthButton, AuthFooter } from "../styles/AuthStyles";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (!validateFullName(fullName)) {
      setErrorMessage("Full name must be at least 3 characters.");
      return;
    }

    if (!validateEmail(emailAddress)) {
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
      await registerUser({ fullName, emailAddress, password });

      alert("Registration successful! Please login now.");

      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <AuthContainer>
      <AuthTitle>Register</AuthTitle>

      <ErrorMessage message={errorMessage} />

      <AuthForm onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter your full name (e.g. Yash Joshi)"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter your email (example@gmail.com)"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <AuthButton type="submit" $variant="register">
          Register
        </AuthButton>
      </AuthForm>

      <AuthFooter>
        Already have an account? <Link to="/">Login</Link>
      </AuthFooter>
    </AuthContainer>
  );
}
