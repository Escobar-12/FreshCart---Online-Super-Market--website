import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../../public/assets/assets';

const isActive = (path) => {return location.pathname === path};

const AdminSideBar = () => {

    const sidebarLinks = [
        {name:"Add Product", path: "/seller", icon: assets.add_icon},
        {name:"Product List", path: "/seller/product-list", icon: assets.product_list_icon},
        {name:"Orders", path: "/seller/orders", icon: assets.order_icon},
    ]
    return (
        <div className='lg:w-64 w-16 hidden md:flex border-r h[550px] text-base border-gray-300 pt-4 flex-col transition-all duration-300'>
            {
                sidebarLinks.map((link,i)=>(
                    <NavLink to={link.path} key={i} end={link.path === "/seller"}
                        className={`flex items-center py-3 px-4 gap-3 
                            ${isActive(link.path)? "border-r-4 md:border-r-[6px] bg-green-400/10 border-green-500 text-green-500"
                            :"hover:bg-gray-100/90 border-white text-gray-700"}`} 
                        >
                        <img src={link.icon} alt="" className='w-7 h-7' />
                        <p className='lg:block hidden text-center'>{link.name}</p>
                    </NavLink>
                ))
            }
        </div>
    )
}

export default AdminSideBar