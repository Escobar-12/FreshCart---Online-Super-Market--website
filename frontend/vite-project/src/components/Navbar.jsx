import React, { useState, useEffect } from 'react'
import {assets} from "../assets/assets"
import { Link, useLocation } from "react-router-dom"
import SearchBar from './SearchBar.jsx'
import ShopCart from './ShopCart.jsx'
import ButtonCustom from "./CustomButton.jsx"
import { CgMenuRightAlt } from "react-icons/cg"
import { IoMdClose } from "react-icons/io"

const Navbar = () => {
    const [openNavBar, setOpenNavBar] = useState(false);
    const location = useLocation();
    const toggleNavBar = () => 
    {
        setOpenNavBar(prev => !prev)
    }

    const isActive = (path) => {return location.pathname === path};

    useEffect(() => 
    {
        if (openNavBar) 
        {
        document.body.classList.add("overflow-hidden");
        } 
        else 
        {
        document.body.classList.remove("overflow-hidden");
        }
    }, [openNavBar]);

    return (
        <header className=' sticky z-40 top-0 p-4 border-b bg-white border-neutral-200'>
            <nav className='max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 w-full flex items-center justify-between '>
                <Link to={"/"} className='cursor-pointer'>
                    <img src={assets.logo} alt="logo" className='shrink-0 flex-1'/>
                </Link>
                <div className='hidden lg:flex items-center justify-between space-x-7 text-neutral-500 font-semibold'>
                    <Link to="/"  className={`${isActive("/") ? "text-green-600/80" : "" }`}>Home</Link>
                    <Link to="/products"  className={`${isActive("/products") ? "text-green-600/80" : "" }`} >All Products</Link>
                    <Link to="/contact"  className={`${isActive("/contact") ? "text-green-600/80" : "" }`}>Contact</Link>
                    <SearchBar />
                    <ShopCart />
                    <ButtonCustom href='/login' label='Login' disable={false} />
                </div>
                {openNavBar ? 
                    (
                        <IoMdClose className='lg:hidden text-3xl text-black cursor-pointer' onClick={toggleNavBar} />
                    ) : 
                    (
                        <CgMenuRightAlt className='lg:hidden text-3xl text-black cursor-pointer' onClick={toggleNavBar} />
                    )}
            </nav>
                <div className={`lg:hidden absolute z-20 left-0 flex justify-center items-center w-full h-screen bg-white transform transition-transform duration-200 ease-in-out ${openNavBar ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className='flex flex-col items-center space-y-10 p-6 text-neutral-500 font-semibold text-lg '>
                        <Link to="/" onClick={toggleNavBar} className={`${isActive("/") ? "text-green-600/80" : "" }`} >Home</Link>
                        <Link to="/products" onClick={toggleNavBar} className={`${isActive("/allproducts") ? "text-green-600/80" : "" }`}>All Products</Link>
                        <Link to="/contact" onClick={toggleNavBar} className={`${isActive("/contact") ? "text-green-600/80" : "" }`}>Contact</Link>
                        <ShopCart />
                        <ButtonCustom href='/login' label='Login' disable={false} />
                    </div>
                </div>
            
        </header>
    )
}

export default Navbar
