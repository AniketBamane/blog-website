import myContext from '@/context/myContext'
import { Pencil } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const context = useContext(myContext)
  return (
   context.showNavbar && <div className='w-full flex justify-between px-2 py-3 border-b-8'>
      <Link to={"/"} className='text-3xl font-bold'>MyBlogs</Link>
      <div className='flex space-x-5'>
        <Link to={"/newly-written"} className='px-3 py-1 rounded-lg border shadow-md cursor-pointer'>Newly Written</Link>
        <Link to={"/all-blogs"} className='px-3 py-1 rounded-lg border shadow-md cursor-pointer'>All Blogs</Link>
        <Link to={"/favourites"} className='px-3 py-1 rounded-lg border shadow-md cursor-pointer'>Favourites</Link>
      </div>
      <div className='flex space-x-5'>
        <Link to={"/contact-us"} className='p-2 border shadow-md rounded-md cursor-pointer'>Contact us</Link>
        <Link to={"/profile"} className='p-2 border shadow-md rounded-md cursor-pointer'>Profile</Link>
        <Link to={"/create-post"} className='h-10 w-10 rounded-full bg-black text-white flex justify-center items-center cursor-pointer'>
      <Pencil />
    </Link>
      </div>
    </div>
  )
}

export default Navbar