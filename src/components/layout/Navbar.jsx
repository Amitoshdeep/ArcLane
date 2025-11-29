import React, { useState } from 'react'

import { Github,Menu, Pen } from 'lucide-react';
import { NavLink } from 'react-router-dom'
import {navurls} from "constants"

const ICON_SIZE = 20;

function Navbar() {

  return (
    <nav className='px-5 md:px-20 py-3 sticky top-0
    flex justify-between items-center bg-black/70 text-white/50
    backdrop-blur-sm z-[999] inset-box-shadow
    '>

      <div className='flex gap-2 items-center'>
        {/* <Menu
        size={ICON_SIZE-4}
        className='cursor-pointer duration-300 text-white/50 hover:text-white'/> */}
        <NavLink to={"/"} className='text-xl text-[#136013]'>
          ArcLane
        </NavLink>
      </div>

      <div className='flex items-center gap-5'>
        <Github
          className='cursor-pointer duration-300 text-white/50 hover:text-white'
          onClick={() => window.open("https://github.com/Amitoshdeep/ArcLane")}
          size={ICON_SIZE}/>
        <Pen
          onClick={()=> location.href="/submit"}
          className='cursor-pointer duration-300 text-white/50 hover:text-white'
          size={ICON_SIZE}/>
      </div>
      {/* For Calling Nav Links */}
      {/* {
        navurls.map( ({name, path}) =>(
          <NavLink
          to={path}>
            {name}
          </NavLink>
        ) )
      } */}
    </nav>
  )
}

export default Navbar
