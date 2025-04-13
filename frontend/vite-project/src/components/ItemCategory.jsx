import React from 'react'
import { categories } from '../assets/assets'
import { Link } from 'react-router-dom'


const ItemCategory = ({Category}) => {
    return (
        <Link to={Category.path} className={`group rounded-lg flex flex-col justify-center items-center cursor-pointer py-5 px-3 `} style={{ backgroundColor: Category.bgColor }}>
            <img src={Category.image} alt="category image" className='group-hover:scale-105 transition duration-250 ease-in-out max-w-28'/>
            <p className='text-sm font-semibold text-neutral-600/80'>{Category.text}</p>
        </Link>
    )
}

export default ItemCategory