import authService from '@/appwrite/auth';
import fileService from '@/appwrite/file';
import userService from '@/appwrite/user';
import CardGird from '@/components/CardGird';
import Loading from '@/components/Loading';
import NormalForm from '@/components/NormalForm';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import conf from '@/config/envConfig';
import myContext from '@/context/myContext';
import { useToast } from '@/hooks/use-toast';
import { Dialog, Title } from '@radix-ui/react-dialog';
import { Query } from 'appwrite';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const {toast} = useToast()
  const navigate = useNavigate()
  const context = useContext(myContext)
  const [loading,setLoading] = useState(true)

  const handleLogout = async()=>{
    try{
      await authService.logout()
      toast({
        title:"Logged Out",
        description:"You have successfully logged out"
      })
      context.setUser(null)
      navigate("/authentication")
    }catch(err){
      toast({
        title:"Error",
        description:err.message
      })
    }
  }
  const fetchUserBlogs = async()=>{
    console.log(context.user, " it is in fetch users blogs in profile ")
    try{
      console.log(context.user.$id)
      const response = await userService.getAllBlogs({
        queries:[
          Query.equal("author",context.user?.$id)
        ],
        collectionId:conf.appwriteBlogsCollection
      })
      console.log(response.documents , " are profile ")
      if(response.documents.length > 0){
        context.setUser(prev => ({...prev,blogs:response.documents}))
      }else{
        toast({
          title:"No Blogs",
          description:"No blog found for this user"
        })
      }
    }catch(err){
      toast({
        title:"Error",
        description:err.message
      })
    }finally{
      setLoading(false)
    }
  }
 useEffect(()=>{
   fetchUserBlogs()
 },[])
 console.log(context.user)

  return (
    loading ? <Loading /> :<div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Profile Information */}
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full mx-auto p-6 md:p-10 space-y-6">
        <div className="flex items-center justify-around space-x-6">
          {/* Profile Image */}
          <img
            src={fileService.getFilePreview({fildId:context?.user?.profileImage})}
            alt={context.user?.name}
            className="w-32 h-32 rounded-full object-cover "
          />
          {/* currentUser Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{context.user?.name}</h1>
            <p className="text-gray-600">{context.user?.email}</p>
            <p className="text-gray-700">{context.user?.bio}</p>
          </div>
          <div className='flex space-x-2'>
            <Dialog>
              <DialogTrigger asChild>
               <Button>Update Profile</Button>
              </DialogTrigger>
              <NormalForm useCase={"edit-profile"} />
            </Dialog>
          <Button
          onClick={handleLogout}
          >Logout</Button>
          </div>
        </div>
      </div>

      {/* User's Blogs */}
      <div className="mt-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Blogs</h2>
        {/* Display CardGrid to show the user's blogs */}
        <CardGird cards={context?.user?.blogs}  />
      </div>
    </div>
  );
};

export default Profile;
