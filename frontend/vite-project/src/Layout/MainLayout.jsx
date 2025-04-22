import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { ColorProvider } from '../context/colorTheme'
import { ApplicationProvider } from '../context/applicationContext'
import FooterSec from '../components/FooterSec'
import AdminNavBar from '../components/AdminNavBar'
import AdminSideBar from '../components/AdminSideBar'

const MainLayout = () => {
    const location = useLocation();

    return (
        <ApplicationProvider>
            { location.pathname.includes("seller") ? <AdminNavBar/>:<Navbar/>}
            
                {
                    location.pathname.includes("seller") ?
                        (
                                <div className="flex flex-row min-h-screen">
                                    <AdminSideBar className="hidden"/>
                                    <div className="flex-1">
                                        <Outlet />
                                    </div>
                                </div>
                        )
                    :
                        (
                            <div>
                                <div className='max-w-[1240px] min-h-screen mx-auto mb-40 px-4 md:px-8 lg:px-16 w-full'>
                                    <Outlet/>
                                </div>
                                <FooterSec/>
                            </div>
                            
                        )
                    
                }            
        </ApplicationProvider>
    )
}

export default MainLayout