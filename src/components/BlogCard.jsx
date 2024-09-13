import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blogImage, blogTitle ,id }) => {
  const navigate = useNavigate()
  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden" >
      <div className="group cursor-pointer" onClick={()=>{
      navigate(`/blog/${id}`)
    }}>
        <img src={blogImage} alt={blogTitle} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />

        {/* Overlay div for dark background on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <h2 className="text-white text-xl font-semibold mb-2">{blogTitle}</h2>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
