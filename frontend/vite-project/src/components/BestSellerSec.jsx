import React from 'react'
import { dummyProducts } from '../assets/assets'
import ItemProductCard from './itemCard'
const BestSellerSec = () => {
    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-semibold'>Best Seller</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-6'>
                {dummyProducts.filter((product)=>product.inStock).slice(0,5).map((item,i)=>(
                    <ItemProductCard key={i} product={item}/>
                ))}
            </div>
        </div>
        
    )
}

export default BestSellerSec