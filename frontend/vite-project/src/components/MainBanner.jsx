import React from 'react'
import { assets } from '../../public/assets/assets'
import { Link } from 'react-router-dom'
import CustomSeeMore from './CustomSeeMore'

const MainBanner = () => {
    return (
        <div className="relative w-full">
        {/* Background Images */}
        <img src={assets.main_banner_bg} alt="banner" className="w-full hidden md:block object-cover" />
        <img src={assets.main_banner_bg_sm} alt="banner" className="w-full md:hidden object-cover" />

        {/* Banner Content */}
        <div className="absolute w-full max-lg:max-w-md inset-0 flex flex-col items-center md:items-start justify-end md:justify-center max-md:mx-auto px-4 pb-20 md:pb-0 md:pl-20 lg:pl-28 ">
            <h1 className=" text-3xl lg:text-5xl font-bold text-center md:text-left max-w-[90%] md:max-w-xl lg:max-w-3xl leading-tight lg:leading-snug">
            <span className='bg-gradient-to-r from-green-300 to-green-700 text-transparent bg-clip-text '>Freshness</span> You Can Trust, Savings You Will Love!
            </h1>

            <div className="mt-6">
            <Link to="/products">
                <CustomSeeMore />
            </Link>
            </div>
        </div>
        </div>
    )
}

export default MainBanner
