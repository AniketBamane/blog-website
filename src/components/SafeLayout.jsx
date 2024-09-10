import React from 'react'

const SafeLayout = ({children}) => {
  return (
    <div className='w-[80%] mx-auto'>
      {children}
    </div>
  )
}

export default SafeLayout