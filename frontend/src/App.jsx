import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import{ Routes,Route,useLocation } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import About from './components/About'
import Contactus from './components/Contactus'
import ProtectedRoutes from './components/ProtectedRoutes'
import PasswordResetRequest from './components/PasswordResetRequest'
import PasswordReset from './components/PasswordReset'
import Profile from './components/Profile'
import Cart from './components/Cart'
import Listing from './components/Listing'



function App() {
  const location = useLocation()
  const noNavbar =
    location.pathname === "/register" ||
    location.pathname === "/" ||
    location.pathname.includes("password")

  return (
    <>
      {noNavbar ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/request/password_reset"
            element={<PasswordResetRequest />}
          />
          <Route path="/password_reset/:token" element={<PasswordReset />} />
        </Routes>
      ) : (
        <Navbar
          content={
            <Routes>
              <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contactus" element={<Contactus />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/listing" element={<Listing/>} />
              </Route>
            </Routes>
          }
        />
      )}
    </>
  );
}

export default App
