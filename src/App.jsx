import React from 'react'
import {  Routes ,Route } from 'react-router-dom'

import Navbar from '@/components/layout/Navbar'
import ScrollToTop from '@/components/layout/ScrollToTop'
import Home from 'pages/Home'

function App() {
  return (
    <div className='font-Poppins cursor-default text-white
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
      <div className="px-20 py-5">

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1 className='h-screen'>About Page</h1>} />
        <Route path="/projects" element={<h1 className='h-screen'>Projects Page</h1>} />
        <Route path="/contact" element={<h1 className='h-screen'>Contact Page</h1>} />
      </Routes>
      </div>
    </div>
  )
}

export default App
