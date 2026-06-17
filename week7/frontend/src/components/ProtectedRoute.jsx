import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../utils/authHelper";

export default function ProtectedRoute({ children }) {
  return isUserLoggedIn() ? children : <Navigate to="/" replace />;
}
