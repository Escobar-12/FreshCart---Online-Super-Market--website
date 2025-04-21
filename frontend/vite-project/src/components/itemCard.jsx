import React, { useEffect, useState } from 'react';
import useApplication from '../hooks/applicationHook';
import { CiShoppingCart } from "react-icons/ci";
import SafeImage from './SafeImage';
const ItemProductCard = ({ product }) => 
{
    const { cartItems, addToCart, update, removeFromCart, navigate, genStars } = useApplication();
    const [count, setCount] = useState(0);

    const handleCountChange = (newCount) => {
        setCount(newCount);
        if (newCount === 0) {
            removeFromCart(product._id);
        } else {
            update(product._id, newCount);
        }
    };


    return (
        <div className="shadow rounded-xl md:px-4 px-3 py-2 bg-white max-w-56" >
            <div className="group cursor-pointer flex items-center justify-center px-2 " onClick={() => {navigate(`/products/${product._id}`); window.scrollTo(0,0) }}>
                <SafeImage imagePath={product.image[0]} alt={product.name} className="group-hover:scale-105 transition max-w-26 md:max-w-36"/>
            </div>
            <div className="text-gray-500/60 text-sm cursor-pointer " onClick={() => {navigate(`/products/${product._id}`); window.scrollTo(0,0) }}>
                <p>{product.category}</p>
                <p  className="text-gray-700 font-medium text-lg truncate w-full cursor-pointer" >{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {genStars(product.rating)}
                    <p>({product.rating})</p>
                </div>
                <div className="flex items-end justify-between mt-3 gap-2">
                    <p className="md:text-xl text-base font-medium text-green-500">
                        ${product.offerPrice}
                        <span className="text-gray-500/60 md:text-sm text-xs line-through ml-1">${product.price}</span>
                    </p>
                    <div className="text-green-500" onClick={(e) => {e.stopPropagation()}}>
                        {! cartItems[product._id]? (
                            <button
                                className="flex items-center justify-center cursor-pointer gap-1 bg-green-200/20 hover:bg-green-200/70 transition-all duration-250 border border--300 md:w-[80px] w-[64px] h-[34px] rounded text-green-600"
                                onClick={() => {addToCart(product._id); setCount(prev => prev+1);}}
                            ><CiShoppingCart/>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center bg-green-500/25 rounded md:w-20 w-16 h-[34px] select-none">
                                <button onClick={() => handleCountChange(Math.max(count - 1, 0))} className="cursor-pointer rounded-l-md text-md px-2 h-full">-</button>
                                <span className="w-5 h-full px-3 flex items-center justify-center">{cartItems[product._id]}</span>
                                <button onClick={() => handleCountChange(count + 1)} className="cursor-pointer rounded-r-md text-md px-2 h-full">+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemProductCard;
