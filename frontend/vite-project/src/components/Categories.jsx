import React from 'react';
import { categories } from '../assets/assets.js';
import useApplication from '../hooks/applicationHook.jsx';

const Categories = () => {
    const { navigate, themeColor } = useApplication();

    return (
        <div className='flex w-fit mx-auto justify-center items-center flex-wrap gap-4 mt-4 border-2 rounded-full p-3' style={{borderColor : themeColor}}>
            {categories.map((category, i) => (
                <div
                    key={i}
                    className='px-3 py-1 rounded-full text-white cursor-pointer text-sm font-medium shadow-md hover:scale-103 hover:shadow-lg transition-all duration-200'
                    style={{ backgroundColor: themeColor, opacity: 0.8 }}
                    onClick={() => navigate(`?category=${category.path}`)}
                >
                    <p>{category.label || category.path}</p>
                </div>
            ))}
        </div>
    );
};

export default Categories;
