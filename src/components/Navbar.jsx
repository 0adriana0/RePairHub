import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;
  const hideLogin = currentPath === "/questions";

  return (
    <nav className="navbar">
      {!hideLogin && (
        <button
          onClick={() => navigate("/login")}
          className={`nav-button ${currentPath === "/login" ? "active" : ""}`}
        >SIGN IN</button>
      )}
      <button
        onClick={() => navigate("/register")}
        className={`nav-button ${
          currentPath === "/register" ? "active" : ""
        }`}
      >SING UP</button>
    </nav>
  );
}
