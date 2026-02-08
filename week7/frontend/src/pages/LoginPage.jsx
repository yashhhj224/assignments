import { useState } from "react";
import { loginUser } from "../api/apiClient";
import { saveAuthData } from "../utils/authHelper";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

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
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h1>

      <ErrorMessage message={errorMessage} />

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email Address"
          value={emailAddress}
          onChange={(event) => setEmailAddress(event.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#16a34a",
            color: "white",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Login
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
