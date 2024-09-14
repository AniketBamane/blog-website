import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const NothingFound = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center  mx-auto bg-gray-100 text-gray-700">
            {/* Illustration */}
            <img 
                src="https://www.auctoresonline.org/frontend-assets/img/nothing_found.png" 
                alt="No Blogs Found"
                className="w-[30vh] mb-2" // Adjust the size of the image as needed
            />

            {/* Message */}
            <p className="text-lg mb-8 text-gray-500">It looks like there are no blogs at the moment. Be the first to create one!</p>

            {/* Button to Create a Blog */}
            <Button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-all duration-300"
                onClick={() => navigate('/create-post')}
            >
                Create a Blog
            </Button>
        </div>
    );
};

export default NothingFound;
