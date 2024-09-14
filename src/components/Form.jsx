import React, { useContext, useState } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Adjust based on your actual import paths
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import authService from '@/appwrite/auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import userService from '@/appwrite/user';
import myContext from '@/context/myContext';


const Form = ({ signin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { toast } = useToast()
  const navigate = useNavigate()
  const context = useContext(myContext)

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0] // Assuming single file upload
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   if(!signin){
    console.log(formData)
    try {
      await authService.createUser({name:formData.name, email:formData.email,password:formData.password});
      toast({
        title:"Sign up successfully !",
        description:'Account created successfully. A verification email has been sent.'
      })
      await userService.createProfile({
        name:formData.name,
        email:formData.email,
        password:formData.password
      })
      await authService.verifyEmail();

    } catch (error) {
      toast({
        title:"Error",
        description:error.message
      })
    }
   }else{
    try{
      console.log(formData)
      const user = await authService.loginUser({email:formData.email, password:formData.password})
      if(user){
        toast({
          title:"Login successful!",
          description:'You have logged in successfully.'
        })
        context.setShowNavbar(true)
        navigate("/")
      }else{
        toast({
          title:"Error",
          description:'Invalid email or password.'
        })
      }
    }catch(error){
      toast({
        title:"Error",
        description:error.message
      })
    }
   }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{signin ? "Login" : "Sign Up"}</DialogTitle>
        <DialogDescription>
          {signin ? "You are just one step away !" : "You have one more step to do !"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className='space-y-2'>
        {!signin && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
           
            
          </>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">{signin ? "Login" : "Sign Up"}</Button>
      </form>
    </DialogContent>
  );
};

export default Form;
