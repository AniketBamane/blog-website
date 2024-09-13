import userService from '@/appwrite/user'
import CardGird from '@/components/CardGird'
import SafeLayout from '@/components/SafeLayout'
import conf from '@/config/envConfig'
import { useToast } from '@/hooks/use-toast'
import { Query } from 'appwrite'
import React, { useEffect, useState } from 'react'

const Popular = () => {
  const [loading,setLoading] = useState(true)
  const [blogs,setBlogs] = useState([])
  const {toast} = useToast()
  const getOurChoiceBlogs = async()=>{
    try {
      const response = await userService.getAllBlogs({
        queries: [
          Query.equal("status",true)
        ],
        collectionId:conf.appwriteBlogsCollection
      })
      console.log(response , " is editor choice")
      if(response.documents.length > 0) {
        setBlogs(response.documents)
      }else{
        toast({
          title:"No New Blogs",
          description:"No new blog found within the last 24 hours."
        })
      }
    } catch (error) {
      console.error(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    getOurChoiceBlogs()

  },[])
  return (
   loading ? <h3>Loading ...</h3> : <CardGird cards={blogs} />
  )
}

export default Popular