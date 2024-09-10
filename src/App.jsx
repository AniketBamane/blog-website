
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Authentication from './pages/auth/Authentication'
import VerificationPage from './pages/auth/VerificationPage'
import AuthLayout from './components/AuthLayout'
import Home from './pages/home/Home'
import NewlyWritten from './pages/home/NewlyWritten'
import Popular from './pages/home/Popular'
import Favourites from './pages/home/Favourites'
import NormalLayout from './components/NormalLayout'
import Contact from './pages/home/Contact'
import Profile from './pages/home/Profile'
import CreatePost from './pages/home/CreatePost'

function App() {

  return (
   <BrowserRouter>
   <Routes>
    
   <Route element={<AuthLayout />}>
    <Route path='/authentication' element={<Authentication />} />
    <Route path='/verification' element={<VerificationPage />} />
   </Route>
  
   <Route element={<NormalLayout />}>
    <Route path='/' element={<Home />} />
    <Route path='/newly-written' element={<NewlyWritten />}  />
    <Route path='/popular' element={<Popular/>}  />
    <Route path='/favourites' element={<Favourites/>}  />
    <Route path='/contact-us' element={<Contact />}  />
    <Route path='/profile' element={<Profile />}  />
    <Route path='/create-post' element={<CreatePost />} />
    </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
