import React from 'react'
import { categories } from '../../public/assets/assets'
import ItemCategory from './ItemCategory'

const CategoriesSec = () => {
    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-semibold'>Categories</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
                {categories.map((item,i)=>(
                    <ItemCategory key={i} Category={item}/>
                ))}
            </div>
        </div>
        
    )
}

export default CategoriesSec