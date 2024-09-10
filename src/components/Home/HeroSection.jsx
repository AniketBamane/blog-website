import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className='min-h-[50vh] bg-black flex relative'>
      <img src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-1/2  ' />
      <div className='w-2/3 flex flex-col absolute left-[18%] top-[40%] z-10'>
      <h3 className='bg-white p-2 rounded-lg text-7xl font-bold mx-auto mb-5 max-w-max border-2 border-black'>Where Next ?</h3>
      <div className='flex space-x-2'>
      <Input
      placeholder="search for author , title , content ...  ex:-  My work in a day ..."
      />
      <Button><Search /></Button>
      </div>
      </div>
      <img src="https://plus.unsplash.com/premium_photo-1684581214880-2043e5bc8b8b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-1/2  right-0 grayscale' />
    </div>
  )
}

export default HeroSection