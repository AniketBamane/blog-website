import userService from '@/appwrite/user'
import Footer from '@/components/Footer'
import EditorChoice from '@/components/Home/EditorChoice'
import HeroSection from '@/components/Home/HeroSection'
import Navbar from '@/components/Home/Navbar'
import SafeLayout from '@/components/SafeLayout'
import conf from '@/config/envConfig'
import { useToast } from '@/hooks/use-toast'
import { Query } from 'appwrite'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [searchBlogs ,setSearchBlogs] = useState([])
  const {toast} = useToast()
  const [loading,setLoading] = useState(true)
  const fetchSomeBlogs = async()=>{
    try{
      const response = await userService.getAllBlogs({
        queries:[
          Query.limit(9)
        ],
        collectionId:conf.appwriteBlogsCollection
      })
      setSearchBlogs(response.documents)
      setLoading(false)
    }catch(err){
      toast({
        title:"Error",
        description:err.message
      })
    }
  }
  useEffect(()=>{
    fetchSomeBlogs()
  },[])
  return (
     <>
      <HeroSection blogs={searchBlogs} setBlogs={setSearchBlogs} setLoading={setLoading} />
      <EditorChoice blogs={searchBlogs} loading={loading}  />
     </>
      
  )
}

export default Home