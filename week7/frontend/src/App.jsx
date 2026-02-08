import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotesDashboard from "./pages/NotesDashboard";
import { isUserLoggedIn } from "./utils/authHelper";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={isUserLoggedIn() ? <NotesDashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
