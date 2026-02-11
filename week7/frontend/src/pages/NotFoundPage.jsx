import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1 style={{ fontSize: "60px", marginBottom: "10px" }}>404</h1>
      <p style={{ fontSize: "18px", fontWeight: "800" }}>Page not found</p>

      <Link to="/" style={{ color: "#2563eb", fontWeight: "800" }}>
        Go to Login
      </Link>
    </div>
  );
}
