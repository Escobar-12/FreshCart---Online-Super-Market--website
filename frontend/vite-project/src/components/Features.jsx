import React from 'react'
import { features } from '../../public/assets/assetss
import useApplication from '../hooks/applicationHook';

const Features = () => {
    const {themeColor} = useApplication(); 
    return (
        <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center max-h-sm pt-16 md:pt-0 md:pr-14 lg:pr-24">
            <div className='flex flex-col lg:gap-4'>
            <h1 className={`text-lg md:text-2xl lg:text-3xl font-semibold mb-4`} style={{ color: themeColor }}>
                Why We Are The Best?
            </h1>
            <div className="flex flex-col justify-between gap-3 max-w-md lg:max-w-xl">
                {features.map((feature, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
                    >
                        <img
                            src={feature.icon}
                            alt="feature icon"
                            className="w-8 sm:w-9 lg:w-11"
                        />
                        <div className="flex flex-col">
                            <h2 className="md:text-md lg:text-xl font-semibold">
                                {feature.title}
                            </h2>
                            <p className="text-[0.7rem] sm:text-xs lg:text-sm text-neutral-400 tracking-tight">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

export default Features
