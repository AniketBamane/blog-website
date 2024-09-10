import React from 'react'
import SafeLayout from './SafeLayout'
import Navbar from './Home/Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const NormalLayout = () => {
  return (
    <SafeLayout>
      <Navbar />
    <div className='min-h-screen'>
    <Outlet />
    </div>
      <Footer />
    </SafeLayout>
  )
}

export default NormalLayout