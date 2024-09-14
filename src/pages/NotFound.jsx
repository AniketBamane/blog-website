import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-8xl font-extrabold mb-4 animate-pulse">404</h1>
      <p className="text-2xl mb-8 opacity-75">Oops! The page you're looking for doesn't exist.</p>

      <Button
          className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
          onClick={() => navigate('/')}
      >
          Go to Home
      </Button>

      <div className="absolute bottom-10 opacity-30">
          <p className="text-sm text-gray-400">Error code: 404</p>
      </div>
  </div>
    );
};

export default NotFound;
