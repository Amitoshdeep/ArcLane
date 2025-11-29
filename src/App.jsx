import React , {useEffect} from 'react'
import {  Routes ,Route, Navigate } from 'react-router-dom'

import Navbar from '@/components/layout/Navbar'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Home from 'pages/Home'
import DevDashboard from './pages/DevDashboard'
import AdminLogin from './pages/AdminLogin'
import Submit from "@/pages/Submit";

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
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    return isAdmin ? children : <Navigate to="/admin-login" />;
  };


  return (
    <div className='font-Poppins cursor-default text-white bg-black
    min-h-[100dvh] w-full relative
    '>
      <ScrollToTop/>
      <Navbar/>

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
    </div>
  )
}

export default App
