import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import SignUpNavbar from "./components/SignUpNavbar";
import Footer from "./components/Footer";
import LocationSet from "./pages/LocationSet";
import ChoseRole from './pages/ChoseRole'
import ChoseSkills from "./pages/ChoseSkills";
import ProfilOpravar from "./pages/ProfilOpravar";
import "./App.css";
import HomeOpravar from "./pages/HomeOpravar";
import SearchingOpravar from "./pages/SearchingOpravar";
import NotificationsOpravar from "./pages/NotificationsOpravar";
import OneInserate from "./pages/OneInserate";

 function AppContent() {

  const location = useLocation();

  const navbarWhiteList = ['/login', '/register']
  const showNavbar = navbarWhiteList.includes(location.pathname)

  const signUpNavbarWhiteList = ['/location-setting', '/chose-role', '/chose-skills' ]
  const showSignUpNavbar = signUpNavbarWhiteList.includes(location.pathname)

  const footerWhiteList = ['/profil-opravar', '/profil-zakaznik', '/notifications-opravar', '/searching-opravar', '/home-opravar', '/home-zakaznik', '/one-inserate']
  const showFooter = footerWhiteList.includes(location.pathname)
  return (
    <>
      {showNavbar && <Navbar />}
      {showSignUpNavbar && <SignUpNavbar/>}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/location-setting" element={<LocationSet/>} />
        <Route path="/chose-role" element={<ChoseRole/>}/>
        <Route path="/chose-skills" element={<ChoseSkills/>}/>
        <Route path="/home-opravar" element={<HomeOpravar/>} />
        <Route path="/searching-opravar" element={<SearchingOpravar/>} />
        <Route path="/one-inserate/" element={<OneInserate/>} />
        <Route path="/notifications-opravar" element={<NotificationsOpravar/>} />
        <Route path="/profil-opravar" element={<ProfilOpravar/>}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {showFooter && <Footer/>}
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