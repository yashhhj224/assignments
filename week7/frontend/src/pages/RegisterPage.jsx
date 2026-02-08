import { useState } from "react";
import { registerUser } from "../api/apiClient";
import { saveAuthData } from "../utils/authHelper";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await registerUser({ fullName, emailAddress, password });
      saveAuthData(response.token, response.user);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h1>

      <ErrorMessage message={errorMessage} />

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
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
            backgroundColor: "#2563eb",
            color: "white",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Register
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
