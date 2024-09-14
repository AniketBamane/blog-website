import React from 'react';

const LoadingProcess = ({page}) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-blue-600 border-dashed rounded-full animate-spin mb-4"></div>
            {/* Loading Message */}
            <p className="text-xl font-semibold text-gray-700">{page=="contact" ? "Sending Message ...": page == "search" ? "Searching Blogs ..." :"Creating Blog ..."}</p>
        </div>
    );
};

export default LoadingProcess;
