import React, { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React Quill styles
import { useToast } from '@/hooks/use-toast';
import DOMPurify from 'dompurify';
import userService from '@/appwrite/user';
import fileService from '@/appwrite/file';
import myContext from '@/context/myContext';
import LoadingProcess from '@/components/LoadingProcess';

// Define custom toolbar options
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'image': true }, { 'video': true }],
    ['clean'],
  ],
};

const formats = [
  'header', 'font', 'list', 'bullet',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'color', 'background', 'align',
  'indent', 'image', 'video'
];

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    status: true, // default to true
  });
  const context  = useContext(myContext)
  const {toast} = useToast()
  const [loading,setLoading] = useState(false)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0], // handle image input
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleContentChange = (content) => {
    setFormData((prevState) => ({
      ...prevState,
      content,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try{
      const sanitizedContent =  DOMPurify.sanitize(formData.content)
      console.log(typeof sanitizedContent , sanitizedContent);
      const fileId = await fileService.uploadFile({image:formData.image})
      const createdBlog = await userService.createBlogDocument({
        title: formData.title,
        content: sanitizedContent,
        image: fileId.$id,
        status: formData.status, 
        author:context.user.$id
      })
      console.log(createdBlog , "-----------------------created blog")
      if(createdBlog){
        context.setUser(prev=>({
          ...prev,
          blogs: [...prev.blogs, createdBlog],
        }))
        toast({
          title: 'Success',
          description: 'Blog created successfully',
        })
        setFormData({title: '', content: '', image: null, status: true}); // Reset form
      }else{
        toast({
          title: 'Error',
          description: 'Oops ! something went wrong ,Failed to create blog , Please try again !',
        })
      }
    }catch(err){
      toast({
        title: 'Error',
        description: err.message,
      })
    }finally{
      setLoading(false)
    }
  };

  return (
   loading? <LoadingProcess page={"create-post"} />  : <div className="max-w-3xl mx-auto mt-10">
            
      <form onSubmit={handleSubmit} className="space-y-3">
<div className='flex justify-between'>
<h1 className="text-2xl font-bold mb-6">Create a New Blog</h1>
<Button type="submit" 
  disabled={loading}
>Create Blog</Button>
</div>
        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title">Blog Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
            disabled={loading}
            placeholder="Enter blog title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Content Input using React Quill */}

        {/* Image Input */}
        <div className="space-y-2 ">  {/* Fixed layout issue by adding margin-top */}
          <Label htmlFor="image">Blog Image</Label>
          <Input
            id="image"
            name="image"
            type="file"
            disabled={loading}
            onChange={handleChange}
          />
        </div>

        {/* Status Input */}
        <div className="space-y-2">
          <Label>Status</Label>
          <div className="flex items-center space-x-4">
            <div>
              <input
                type="radio"
                id="published"
                name="status"
                value={true}
              disabled={loading}
                checked={formData.status}
                onChange={handleChange}
                className="mr-2"
              />
              <Label htmlFor="published">Published</Label>
            </div>
            <div>
              <input
                type="radio"
                id="draft"
                name="status"
                value={false}
              disabled={loading}
                checked={!formData.status}
                onChange={handleChange}
                className="mr-2"
              />
              <Label htmlFor="draft">Draft</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Blog Content</Label>
          <ReactQuill
            id="content"
            theme="snow"
            disabled={loading}
            value={formData.content}
            onChange={handleContentChange}
            placeholder="Write your blog content here..."
            modules={modules}  // Added modules for more toolbar options
            formats={formats}  // Define formats to support
          />
        </div>
 
      </form>
    </div>
  );
};

export default CreatePost;
