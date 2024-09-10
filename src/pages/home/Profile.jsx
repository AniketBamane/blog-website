import CardGird from '@/components/CardGird';
import React, { useState } from 'react';
const Profile = () => {
  const [user,setUser] = useState({
    name:"Aniket",
    profileImage:"https://play-lh.googleusercontent.com/vco-LT_M58j9DIAxlS1Cv9uvzbRhB6cYIZJS7ocZksWRqoEPat_QXb6fVFi77lciJZQ=w526-h296-rw",
    email:"aniket@placeholder.com",
    bio:"i am passionate write and so happy to share more of my ideas"
  })
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Profile Information */}
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full mx-auto p-6 md:p-10 space-y-6">
        <div className="flex items-center space-x-6">
          {/* Profile Image */}
          <img
            src={user.profileImage || "https://via.placeholder.com/150"}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover "
          />
          {/* User Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-700">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* User's Blogs */}
      <div className="mt-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Blogs</h2>
        {/* Display CardGrid to show the user's blogs */}
        <CardGird />
      </div>
    </div>
  );
};

export default Profile;
