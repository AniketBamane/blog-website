import CardGird from '@/components/CardGird'
import Footer from '@/components/Footer'
import Navbar from '@/components/Home/Navbar'
import SafeLayout from '@/components/SafeLayout'
import myContext from '@/context/myContext'
import React, { useContext } from 'react'

const Favourites = () => {
  const context = useContext(myContext)
  return (
    <CardGird cards={context?.user?.favourites}  />
  
  )
}

export default Favourites