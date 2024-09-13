import React, { useContext, useEffect, useState } from 'react'
import SafeLayout from './SafeLayout'
import Navbar from './Home/Navbar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import authService from '@/appwrite/auth'
import userService from '@/appwrite/user'
import { Query } from 'appwrite'
import Loading from './Loading'
import conf from '@/config/envConfig'
import myContext from '@/context/myContext'

const NormalLayout = () => {
  const context = useContext(myContext)
  const {toast} = useToast()
  const [loading,setLoading] = useState(true)
  const navigate = useNavigate()

  const getCurrentUser = async()=>{
    try {
      const response = await authService.getCurrentUser()
      console.log(response)
      if(response.emailVerification){
        console.log(response.$id)
        const registeredUser = await userService.getAllBlogs({
          queries: [
            Query.equal("email", response.email)
          ],
          collectionId: conf.appwriteUsersCollection
        })
        console.log(registeredUser , " is registered user")
        console.log(registeredUser.documents[0])
        context.setUser(registeredUser.documents[0])
      }else{
        context.setUser(null)
        navigate('/authentication', {replace: true})
      }
    } catch (error) {
      toast({
        title:"Error",
        description:error.message
      })
      navigate("/authentication",{replace:true})
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    getCurrentUser()
  },[])
  return (
   loading ? <Loading /> : <SafeLayout>
      <Navbar />
    <div className='min-h-screen'>
    <Outlet />
    </div>
      <Footer />
    </SafeLayout>
  )
}

export default NormalLayout