import React from 'react'
import BlogCard from './BlogCard'

const CardGird = () => {
  const handleAddToFavorites = ()=>{
    console.log("wowo")
  }
  return (
    <div className='grid grid-cols-3 gap-5 mt-5'>
    <BlogCard
      blogImage="https://via.placeholder.com/400x300"
      blogTitle="My Awesome Blog"
      authorImage="https://via.placeholder.com/40"
      authorName="John Doe"
      onAddToFavorites={handleAddToFavorites}
    />
     <BlogCard
      blogImage="https://via.placeholder.com/400x300"
      blogTitle="My Awesome Blog"
      authorImage="https://via.placeholder.com/40"
      authorName="John Doe"
      onAddToFavorites={handleAddToFavorites}
    />
     <BlogCard
      blogImage="https://via.placeholder.com/400x300"
      blogTitle="My Awesome Blog"
      authorImage="https://via.placeholder.com/40"
      authorName="John Doe"
      onAddToFavorites={handleAddToFavorites}
    />
     <BlogCard
      blogImage="https://via.placeholder.com/400x300"
      blogTitle="My Awesome Blog"
      authorImage="https://via.placeholder.com/40"
      authorName="John Doe"
      onAddToFavorites={handleAddToFavorites}
    />
     <BlogCard
      blogImage="https://via.placeholder.com/400x300"
      blogTitle="My Awesome Blog"
      authorImage="https://via.placeholder.com/40"
      authorName="John Doe"
      onAddToFavorites={handleAddToFavorites}
    />
    </div>
  )
}

export default CardGird