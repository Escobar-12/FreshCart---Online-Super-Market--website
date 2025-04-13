import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { ColorProvider } from '../context/colorTheme'
import { ApplicationProvider } from '../context/applicationContext'
import FooterSec from '../components/FooterSec'


const MainLayout = () => {
    const location = useLocation();

    return (
        <ApplicationProvider>
            { location.pathname.includes("seller") ? null:<Navbar/>}
            <div className='max-w-[1240px] mx-auto mb-40 px-4 md:px-8 lg:px-16 w-full'>
                <Outlet/>
            </div>
            <FooterSec/>
        </ApplicationProvider>
    )
}

export default MainLayout