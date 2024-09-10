import React from 'react';
import { Heart } from 'lucide-react'; // Lucide react icon
import { Button } from '@/components/ui/button'; // Assuming you have this or adjust import

const BlogCard = ({ blogImage, blogTitle, authorImage, authorName, onAddToFavorites }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden ">
      <img src={blogImage} alt={blogTitle} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{blogTitle}</h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={authorImage}
              alt={authorName}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">{authorName}</p>
            </div>
          </div>

          <Button onClick={onAddToFavorites} variant="ghost">
            <Heart  className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
