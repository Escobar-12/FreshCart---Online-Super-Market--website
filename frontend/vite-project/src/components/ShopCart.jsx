import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import useApplication from '../hooks/applicationHook';


const ShopCart = () => {
    const {themeColor, getCartCount} = useApplication();
    return (
        <Link to={"/cart"}>
            <div className='relative'>
                <CiShoppingCart className='text-2xl '/>
                <div className='absolute -top-1 -right-1 rounded-full min-w-[1rem] min-h-[1rem] text-white flex justify-center items-center text-xs px-1' style={{background: themeColor}}>
                    {getCartCount()}
                </div>
            </div>
        </Link>
    )
}

export default ShopCart