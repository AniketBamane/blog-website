import React from 'react'
import CardGird from '../CardGird'

const EditorChoice = ({blogs,loading}) => {

  return (
    <div className='w-full space-y-3'>
      <h2 className='text-xl  font-thin'>Your search output will appear here ...</h2>
     {loading ? <h2>searching Documents...</h2> :<CardGird cards={blogs} />}
    </div>
  )
}

export default EditorChoice