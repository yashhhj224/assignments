import { useState } from "react";
import { loginUser } from "../api/apiClient";
import { saveAuthData } from "../utils/authHelper";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/auth.css";

export default function LoginPage() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await loginUser({ emailAddress, password });
      saveAuthData(response.token, response.user);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>

      <ErrorMessage message={errorMessage} />

      <form className="auth-form" onSubmit={handleLogin}>
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

        <button type="submit" className="auth-btn login">
          Login
        </button>
      </form>

      <p className="auth-footer">
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
