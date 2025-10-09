import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import SignUpNavbar from "./components/SignUpNavbar";
import LocationSet from "./pages/LocationSet";
import ChoseRole from './pages/ChoseRole'
import "./App.css";

 function AppContent() {
  
  const location = useLocation();
  const hideNavbar =  location.pathname === "location-setting" /* "/" */
  const showSignUpNavbar = location.pathname === "location-setting"/*||'VÝBĚR ROLE'|| 'ZÁPIS SCHOPNOSTÍ'*/
  return (
    <>
      {/* ! */hideNavbar && <Navbar />}
      {!showSignUpNavbar && <SignUpNavbar/>}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/location-setting" element={<LocationSet/>} />
        <Route path="/chose-role" element/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
