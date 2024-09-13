import React from 'react'
import BlogCard from './BlogCard'
import fileService from '@/appwrite/file'

const CardGird = ({cards=[]}) => {

  return (
    <div className='grid grid-cols-3 gap-5 mt-5'>
    {/* <BlogCard
      blogImage="https://via.placeholder.com/400x300"
      blogTitle="My Awesome Blog"
      authorImage="https://via.placeholder.com/40"
      authorName="John Doe"
      onAddToFavorites={handleAddToFavorites}
    /> */}
    {
      cards.length <= 0 ? 
      <h3>No Blogs Found !</h3>
      :
      cards.map((card, index)=>(
        <BlogCard 
        id={card.$id}
        blogImage={fileService.getFilePreview({fildId:card.image})}
        blogTitle={card.title}
        />
      ))
    }
    </div>
  )
}

export default CardGird