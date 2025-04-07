import React, { useState } from 'react'
import logo from "../assets/logo.svg"
import { Link } from "react-router-dom"
import SearchBar from './SearchBar.jsx'
import ShopCart from './ShopCart.jsx'
import ButtonCustom from "./CustomButton.jsx"
import { CgMenuRightAlt } from "react-icons/cg"
import { IoMdClose } from "react-icons/io"

const Navbar = () => {
    const [openNavBar, setOpenNavBar] = useState(false)
    const toggleNavBar = () => {
        setOpenNavBar(prev => !prev)
    }

    return (
        <header className='p-4 border-b border-neutral-200'>
            <nav className='max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 w-full flex items-center justify-between '>
                <div className='cursor-pointer'>
                    <img src={logo} alt="logo" />
                </div>
                <div className='hidden md:flex items-center justify-between space-x-7 text-neutral-600 font-semibold'>
                    <Link to="/">Home</Link>
                    <Link to="/products">All Products</Link>
                    <Link to="/contact">Contact</Link>
                    <SearchBar />
                    <ShopCart />
                    <ButtonCustom href='/login' label='Login' disable={false} />
                </div>
                {openNavBar ? (
                    <IoMdClose className='md:hidden text-3xl text-black cursor-pointer' onClick={toggleNavBar} />
                ) : (
                    <CgMenuRightAlt className='md:hidden text-3xl text-black cursor-pointer' onClick={toggleNavBar} />
                )}
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden top-0 left-0 flex justify-center items-center w-full h-screen bg-white z-40 transform transition-transform duration-200 ease-in-out ${
                    openNavBar ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className='flex flex-col items-center space-y-10 p-6 text-neutral-600 font-semibold text-lg '>
                    <Link to="/" onClick={toggleNavBar}>Home</Link>
                    <Link to="/products" onClick={toggleNavBar}>All Products</Link>
                    <Link to="/contact" onClick={toggleNavBar}>Contact</Link>
                    <ShopCart />
                    <ButtonCustom href='/login' label='Login' disable={false} />
                </div>
            </div>
        </header>
    )
}

export default Navbar
