import myContext from '@/context/myContext'
import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
  const context = useContext(myContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(context.user){
      navigate("/") // Redirect to homepage if user is authenticated already
    }
  },[])
  console.log(context.user)
  return (
    <Outlet />
  )
}

export default AuthLayout