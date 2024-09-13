import fileService from '@/appwrite/file'
import userService from '@/appwrite/user'
import React, { useEffect, useState } from 'react'

const Profile = ({blog , setBlog}) => {
  const [loading,setLoading] = useState(true)
  const fetchAuthorDetails = async ()=>{
    try{
        console.log("--------------",blog.authorId, "is author id")
        const response = await userService.getProfile(blog.authorId)
        console.log("--------------------------" , response)
        setBlog(prev=>({
            ...prev,
            authorName:response.name,
            authorPic:response.profileImage,
            authorEmail:response.email,
        }))
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
    fetchAuthorDetails()
  },[])
  return (
   loading? <h2>Loading profile....</h2> : <div className="flex items-center">
    {/* Author Pic */}
    {blog.authorPic && (
        <img
            src={fileService.getFilePreview({fildId:blog.authorPic})}
            alt={blog.authorName}
            className="w-12 h-12 rounded-full object-cover mr-4"
        />
    )}
    {/* Author Name */}
    <div>
        <h2 className="text-xl font-semibold">{blog.authorName}</h2>
        <h2 className="text-md font-semibold">{blog.authorEmail}</h2>
    </div>
</div>
  )
}

export default Profile