import { useState } from "react";
import { registerUser } from "../api/apiClient";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/auth.css";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const allowedDomain = "gmail.com";

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const domain = emailAddress.split("@")[1];

    if (!domain) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (domain.toLowerCase() !== allowedDomain) {
      setErrorMessage(`Only ${allowedDomain} emails are allowed.`);
      return;
    }

    try {
      await registerUser({ fullName, emailAddress, password });

      alert("Registration successful! Please login now.");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Register</h1>

      <ErrorMessage message={errorMessage} />

      <form className="auth-form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter your full name (e.g. Yash Joshi)"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder={`Enter your email (only @${allowedDomain})`}
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Create password (min 6 characters)"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" className="auth-btn register">
          Register
        </button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
