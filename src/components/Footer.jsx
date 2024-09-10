import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4 mt-2">
      <div className="container mx-auto text-center">
        <p className="text-white text-sm">
          &copy; {new Date().getFullYear()} MyBlogs. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
