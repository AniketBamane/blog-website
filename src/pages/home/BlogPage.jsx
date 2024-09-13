import fileService from '@/appwrite/file';
import userService from '@/appwrite/user';
import { useToast } from '@/hooks/use-toast';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Profile from '@/components/Profile';

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

    useEffect(()=>{
        fetchCurrentBlog()
    },[])
    return (
       loading ? <h2>Loading Blog Document ...</h2> :  <div className="max-w-3xl mx-auto my-8 p-4 border rounded-lg shadow-lg bg-white">
        {/* Blog Title */}
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

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
