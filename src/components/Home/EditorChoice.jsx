import React from 'react'
import CardGird from '../CardGird'
import LoadingProcess from '../LoadingProcess'

const EditorChoice = ({blogs,loading}) => {

  return (
    <div className='w-full space-y-3'>
      <h2 className='text-xl  font-thin'>Your search output will appear here ...</h2>
     {loading ? <LoadingProcess page={"search"} /> :<CardGird cards={blogs} />}
    </div>
  )
}

export default EditorChoice