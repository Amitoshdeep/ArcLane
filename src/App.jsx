import React , {useEffect} from 'react'
import {  Routes ,Route } from 'react-router-dom'

import Navbar from '@/components/layout/Navbar'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Home from 'pages/Home'
import DevDashboard from './pages/DevDashboard'

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
      <div className="px-20 py-5 relative z-10">

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/dev' element={ <DevDashboard/> } />
      </Routes>
      </div>
    </div>
  )
}

export default App
