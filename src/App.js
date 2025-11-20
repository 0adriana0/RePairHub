import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase";

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
import ProfilZakaznik from "./pages/ProfilZakaznik";
import Prispevky from "./pages/Prispevky";
import AddPrispevky from "./pages/AddPrispevky";
import "./App.css";
import HomeOpravar from "./pages/HomeOpravar";
import SearchingOpravar from "./pages/SearchingOpravar";
import NotificationsOpravar from "./pages/NotificationsOpravar";
import OneInserate from "./pages/OneInserate";

import "./App.css";

function AppContent() {
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div>Loading...</div>;

  const navbarWhiteList = ['/login', '/register']
  const showNavbar = navbarWhiteList.includes(location.pathname)

  const signUpNavbarWhiteList = ['/location-setting', '/chose-role', '/chose-skills' ]
  const showSignUpNavbar = signUpNavbarWhiteList.includes(location.pathname)

  const footerWhiteList = ['/profil-opravar', '/profil-zakaznik', '/notifications-opravar', '/searching-opravar', '/home-opravar', '/home-zakaznik', /^\/one-inserate\/[^/]+$/,'/profil-zakaznik/prispevky',
  '/profil-zakaznik/add/step1', '/notifications-zakaznik', '/searching-zakaznik']
  const showFooter = footerWhiteList.some(item => 
    typeof item === 'string' ? item === location.pathname : item.test(location.pathname)
  )
console.log(showFooter);


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
        <Route path="/profil-opravar" element={user ? <ProfilOpravar user={user}/> : <Navigate to="/login" />} />
        <Route path="/profil-zakaznik" element={user ? <ProfilZakaznik user={user}/> : <Navigate to="/login" />} />
        <Route path="/profil-zakaznik/prispevky" element={user ? <Prispevky user={user}/> : <Navigate to="/login" />} />
        <Route path="/profil-zakaznik/add/step1" element={user ? <AddPrispevky user={user}/> : <Navigate to="/login" />} />
        <Route path="/home-opravar" element={<HomeOpravar/>} />
        <Route path="/searching-opravar" element={<SearchingOpravar/>} />
        <Route path="/one-inserate/:inserateId" element={<OneInserate/>} />
        <Route path="/notifications-opravar" element={<NotificationsOpravar/>} />
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
