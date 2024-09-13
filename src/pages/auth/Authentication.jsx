import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import Form from "@/components/Form";
import myContext from "@/context/myContext";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const context = useContext(myContext)
  const navigate = useNavigate()
  useEffect(()=>{
    if(context.user){
      navigate("/")
    }
  },[])
  return (
    <div className="flex min-h-screen  bg-gray-100">
      {/* Left Section: Image */}
      <div className="flex-grow h-screen ">
               <img
         src="https://img.freepik.com/free-vector/blog-post-concept-illustration_114360-26355.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725840000&semt=ais_hybrid"
         alt="blog image"
         className="h-[90%] w-full object-contain"
        />
      </div>

      {/* Right Section: Authentication Form */}
      <div className="w-full md:w-1/3 flex items-center bg-white shadow-lg rounded-lg">
        <div className="w-[90%] mx-auto space-y-6 py-8">
          {/* Website Name */}
          <h2 className="text-4xl font-bold italic text-center">MyBlogs</h2>

          {/* Tagline */}
          <h3 className="text-xl italic text-center">
            Ideas Worth Sharing, Stories Worth Telling.
          </h3>

          <hr className="bg-gray-300 h-[2px]" />

          {/* Prompt for New Users */}
          <h4 className="text-lg font-bold italic text-center">
            Haven't you joined us yet? <Frown className="inline" />
          </h4>

          <h4 className="text-xl italic underline text-center">
            No Worry! Choose one and get started!
          </h4>

          {/* Sign Up & Login Buttons */}
          <div className="flex justify-between space-x-4">
            <Dialog>
              <DialogTrigger asChild>
            <Button className="w-1/2 bg-black hover:bg-gray-600 text-white py-2 rounded-md">
              Sign Up
            </Button>
              </DialogTrigger>
              <DialogContent>
                <Form signin={false} />
              </DialogContent>
            </Dialog>
            <Dialog>
            <DialogTrigger asChild>
            <Button className="w-1/2 bg-black hover:bg-gray-600 text-white py-2 rounded-md">
              Login
            </Button>
            </DialogTrigger>
              <DialogContent>
                <Form signin={true} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
