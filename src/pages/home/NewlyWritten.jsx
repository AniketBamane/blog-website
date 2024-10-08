import userService from '@/appwrite/user'
import CardGird from '@/components/CardGird'
import Loading from '@/components/Loading'
import conf from '@/config/envConfig'
import { useToast } from '@/hooks/use-toast'
import { Query } from 'appwrite'
import React, { useEffect, useState } from 'react'

const NewlyWritten = () => {
  const {toast} = useToast()
  const[loading,setLoading] = useState(true)
  const [blogs,setBlogs] = useState([])
  const getNewBlogs = async()=>{
    try{
      const currentTime = Math.floor(Date.now() / 1000); 
      const oneDayAgo = currentTime - 86400;
      const response = await userService.getAllBlogs({
        queries:
          [
            Query.greaterThan('createdAt', oneDayAgo),
            Query.lessThan('createdAt', currentTime)
        ],
         collectionId:conf.appwriteBlogsCollection
      })
      if(response.documents.length > 0){
        setBlogs(response.documents)
      }else{
        toast({
          title:"No New Blogs",
          description:"No new blog found within the last 24 hours."
        })
      }
    }catch(err){
      toast({
        title:"Error",
        description:err.message
      })
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
getNewBlogs()
  },[])
  return (
    loading ? <Loading /> :
    <div>
      <h2 className='font-thin text-xl'>Blogs created in last 24 hours ....</h2>
      <CardGird cards={blogs} />
    </div>
  )
}

export default NewlyWritten