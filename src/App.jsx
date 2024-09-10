import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Authentication from './pages/auth/Authentication'
import VerificationPage from './pages/auth/VerificationPage'
import AuthLayout from './components/AuthLayout'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <Routes element={<AuthLayout />}>
    <Route path='/authentication' element={<Authentication />} />
    <Route path='/verification' element={<VerificationPage />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
