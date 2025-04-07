import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
    return (
        <div className='max-w-md flex items-center justify-between p-1 px-2 rounded-full border border-gray-200'>
            <input type="text" className='flex-1 ' placeholder='Search products'/>
            <CiSearch className='text-lg'/>
        </div>
    )
}

export default SearchBar