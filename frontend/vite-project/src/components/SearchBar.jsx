import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import useApplication from '../hooks/applicationHook';

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const {location, navigate, searchQuery, setSearchQuery} = useApplication();
    

    const filterProducts = (e) =>
    {
        e.preventDefault();
        setSearchQuery(query);
    }

    useEffect(()=>
    {
        if(searchQuery.trim().length > 0 && location.pathName !== "/products")
        {
            navigate(`/products?search=${query}`);
        }
    },[searchQuery])

    useEffect(()=>
    {
        const params = new URLSearchParams(location.search);
        setQuery(params.get("search")||"");
    },[])

    return (
        <form className='max-w-md flex items-center justify-between p-1 px-2 rounded-full border-2 border-gray-300' onSubmit={(e) => filterProducts((e))}>
            <input type="text" alt='Search products' className='flex-1 border-none outline-none text-neutral-400' placeholder='Search products' value={query} onChange={(e) => setQuery(e.target.value)} />
            <CiSearch className='text-3xl hover:bg-gray-200/70 p-1 rounded-full transition-all duration-250' onClick={(e)=> filterProducts(e)} />
        </form>
    )
}

export default SearchBar