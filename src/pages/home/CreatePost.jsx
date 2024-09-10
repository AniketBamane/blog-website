import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import React Quill styles

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
    status: 'true', // default to true
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
            
      <form onSubmit={handleSubmit} className="space-y-3">
<div className='flex justify-between'>
<h1 className="text-2xl font-bold mb-6">Create a New Blog</h1>
<Button type="submit">Create Blog</Button>
</div>
        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title">Blog Title</Label>
          <Input
            id="title"
            name="title"
            type="text"
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
                value="true"
                checked={formData.status === 'true'}
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
                value="false"
                checked={formData.status === 'false'}
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
