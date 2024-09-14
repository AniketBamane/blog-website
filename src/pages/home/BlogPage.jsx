import fileService from '@/appwrite/file';
import userService from '@/appwrite/user';
import { useToast } from '@/hooks/use-toast';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Profile from '@/components/Profile';
import Loading from '@/components/Loading';
import { Heart } from 'lucide-react';
import myContext from '@/context/myContext';
import LoadingProcess from '@/components/LoadingProcess';

const BlogPage = () => {
    const [blog,setBlog] = useState( {
        title: "",
        image: "", // Replace with actual image URL
        content: ``,
        authorName: "",
        authorId:"",
        authorPic: "", // Replace with actual image URL
        authorEmail:""
    })
    const params = useParams()
    const {toast} = useToast()
    const [loading,setLoading] = useState(true) 
    const context = useContext(myContext)
    const fetchCurrentBlog = async ()=>{
        try{
            const response = await userService.getBlogDocument({fileid:params.id})
            console.log(response)
            setBlog(prev=>({
                ...prev,
                title:response.title,
                image:response.image,
                content:response.content,
                authorId:response.author
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
    const handleAddFavourite = async()=>{
        setLoading(true)  // Loading state for button
       toast({
        title:"Loading",
        description:"please wait ...",
       })
        try{
            const user =  await userService.addToFavourite({userId:context.user.$id,documentId:params.id})
            if(user){

                if(context.user.favourites.some(f=>f.$id == params.id )){
                    context.setUser(prev=>({
                        ...prev,
                        favourites:user.favourites.filter(f=>f.$id!= params.id)
                    }))
                    toast({
                        title:"Success",
                        description:"blog is removed from favourites"
                    })
                }else{
  
                    context.setUser(prev=>({
                        ...prev,
                        favourites:user.favourites
                    }))
                    toast({
                        title:"Success",
                        description:"blog is Added to favourites"
                    })
                }
            }else{
                toast({
                    title:"Error",
                    description:"Failed to add to favourites"
                })
            }
        }catch(err){
            toast({
                title:"Error",
                description:err.message
            })
        }finally{
            setLoading(false) // Loading state for button after completion of operation
        }
    }

    useEffect(()=>{
        fetchCurrentBlog()
    },[])
    return (
       loading ? <Loading /> :  <div className="max-w-3xl mx-auto my-8 p-4 border rounded-lg shadow-lg bg-white">
        {/* Blog Title */}
      <div className='flex justify-between'>
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <Heart fillOpacity={0.6} fill='red' className='cursor-pointer' onClick={handleAddFavourite} />
      </div>

        {/* Blog Image */}
        {blog.image && (
            <div className="mb-6">
                <img
                    src={fileService.getFilePreview({fildId:blog.image})}
                    alt={blog.title}
                    className="w-full h-64 object-cover rounded-lg"
                />
            </div>
        )}

        {/* Blog Content */}
        <div className="mb-8 text-lg text-gray-700">
            <p>{parse(blog.content)}</p>
        </div>

        {/* Author Information */}
        <Profile blog={blog} setBlog={setBlog} />
    </div>
    );
};

export default BlogPage;
