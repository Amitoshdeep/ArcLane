import React , {useEffect, useState} from 'react'
import {  Routes ,Route, Navigate } from 'react-router-dom'
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from 'components/layout/Navbar'
import ScrollToTop from 'components/layout/ScrollToTop'
import Home from 'pages/Home'
import DevDashboard from 'pages/DevDashboard'
import AdminLogin from 'pages/AdminLogin'
import Submit from "pages/Submit";
import About from "pages/About";
import Disclaimer from "pages/Disclaimer";
import Footer from 'components/layout/Footer'
import ScrollTopButton from 'components/layout/ScrollTopButton'
import BuyMeCoffeeButton from 'components/ui/BuyMeCoffeeButton';

function App() {
  useEffect(() => {
    const handle = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "q") {
        window.location.href = "/dev";
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  const AdminRoute = ({ children }) => {
    const [allowed, setAllowed] = React.useState(null);

    React.useEffect(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/admin/me`, {
          withCredentials: true
        })
        .then((res) => {
          setAllowed(res.data.admin);
        })
        .catch(() => setAllowed(false));
    }, []);

    // while checking
    if (allowed === null) return <div className="text-white p-5">Checking...</div>;

    // if admin → show page
    return allowed ? children : <Navigate to="/admin-login" />;
  };

  return (
    <div className='font-Poppins cursor-default text-white bg-black
    min-h-[100dvh] w-full relative
    '>
      <ScrollToTop/>
      <Navbar/>
      <ScrollTopButton/>

      {/* Custom BG */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #072607 100%)",
        }}
      />

      {/* Routes */}
      <div className="md:px-5 lg:px-15 py-5 relative z-10">

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path='/admin-login' element={<AdminLogin/>} />
        <Route path="/submit" element={<Submit />} />
        <Route
          path="/dev"
          element={
            <AdminRoute>
              <DevDashboard />
            </AdminRoute>
          }
        />

      </Routes>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        pauseOnHover
      />
      <BuyMeCoffeeButton/>
      <Footer/>
    </div>
  )
}

export default App
