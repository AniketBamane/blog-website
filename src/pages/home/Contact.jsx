import React, { useState } from 'react';
import { Input } from '@/components/ui/input'; // Adjust import based on your Input component
import { Button } from '@/components/ui/button'; // Adjust import based on your Button component

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic (e.g., send data to server)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white shadow-md rounded-lg max-w-4xl w-full p-6 md:p-10 space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Have any questions about our blogs? Feel free to reach out.
        </p>

        {/* Image */}
        <div className="w-full mb-8">
          <img
            src="https://doi-ds.org/images/upload/contact_us.jpg" // Replace with a real image
            alt="Blog Query"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg h-32 resize-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full py-2 bg-black text-white rounded-lg">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
