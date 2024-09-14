import React, { useContext, useState } from 'react';
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import userService from '@/appwrite/user';
import fileService from '@/appwrite/file';
import myContext from '@/context/myContext';

const NormalForm = ({ useCase }) => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    profileImage: null,
  });
  const {toast} = useToast()
  const context = useContext(myContext)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    toast({
      title: loading? 'Loading...' : 'Updating Profile',
      description: loading? 'Please wait...' : '',
      duration: loading? 0 : 2000,
    })
   try{
    console.log(formData );
    const fileId = await fileService.uploadFile({image:formData.profileImage})
    const user =  await userService.updateProfile(context.user.$id,{
      name: formData.name ? formData.name :null,
      bio: formData.bio ? formData.bio : null,
      profileImage: fileId.$id,
    })
    console.log(user)
    if(user){
      toast({
        title:'success',
        description: 'Profile updated successfully!',
      });
      context.setUser(prev =>({...prev ,name:formData.name,bio:formData.bio,profileImage:fileId.$id}))
      setFormData({
        name: '',
        bio: '',
        profileImage: null,
      })
    }else{
      toast({
        title: 'error',
        description: 'Failed to update profile',
      });
    }
   }catch(err){
    toast({
      title: 'error',
      description: err.message,
    });
   }finally{
    setLoading(false)
   }
  };

  return (
    <DialogContent>
      <DialogTitle>{useCase === 'edit-profile' ? 'Edit Profile' : ''}</DialogTitle>
      <DialogDescription>
        {useCase === 'edit-profile' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                disabled={loading}
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                type="text"
                disabled={loading}

                placeholder="Enter your bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </div>

            {/* Profile Image File Input */}
            <div className="space-y-2">
              <Label htmlFor="profileImage">Profile Image</Label>
              <Input
                id="profileImage"
                name="profileImage"
                type="file"
                accept="image/*"
                disabled={loading}

                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="bg-black text-white w-full"
                disabled={loading}
            
            >
              Submit
            </Button>
          </form>
        )}
      </DialogDescription>
    </DialogContent>
  );
};

export default NormalForm;
