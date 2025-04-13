import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    return (
        <div className='max-w-md flex items-center justify-between p-1 px-2 rounded-full border-2 border-gray-200'>
            <input type="text" alt='Search products' className='flex-1 border-none outline-none text-neutral-300' placeholder='Search products'/>
            <CiSearch className='text-3xl hover:bg-gray-200/70 p-1 rounded-full transition-all duration-250'/>
        </div>
    )
}

export default SearchBar