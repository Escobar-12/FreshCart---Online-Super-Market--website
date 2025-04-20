import React from 'react';

const CircularProgress = () => {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-10 h-10 border-4 border-t-transparent border-green-600 rounded-full animate-spin"></div>
        </div>
    );
};

export default CircularProgress;
