import {useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth.jsx'
import {assets} from '../../public/assets/assets'
import { Link } from "react-router-dom"
import ButtonCustom from './CustomButton.jsx'
import { CgMenuRightAlt } from "react-icons/cg"
import { IoMdClose } from "react-icons/io"
import useApplication from '../hooks/applicationHook.jsx'

const AdminNavBar = () => {
    const [openNavBar, setOpenNavBar] = useState(false);
    const {auth} = useAuth();
    const {navigate, location} = useApplication();


    const toggleNavBar = () => 
    {
        setOpenNavBar(prev => !prev)
    }

    useEffect(() => 
    {
        if (openNavBar) 
        {
        document.body.classList.add("overflow-hidden");
        } 
        else 
        {
        document.body.classList.remove("overflow-hidden");
        }
    }, [openNavBar]);


    return (
        <header className='sticky z-40 top-0 p-4 border-b bg-white border-neutral-200'>
            <nav className=' flex items-center justify-between '>
                <Link to={"/"} className='cursor-pointer'>
                    <img src={assets.logo} alt="logo" className='shrink-0 flex-1'/>
                </Link>
            
            <div className='hidden md:flex justify-center items-center gap-6 text-gray-500'>
                <p>Hi! Admin</p>
                <button onClick={()=> navigate("/logout",{state:{from:location}})} className=' adminLogout rounded-full text-sm px-4 py-1'>
                    Logout
                </button>
            </div>
                {openNavBar ? 
                    (
                        <IoMdClose className='md:hidden text-3xl text-black cursor-pointer' onClick={toggleNavBar} />
                    ) : 
                    (
                        <div className='flex items-center gap-7 md:hidden'>
                            <CgMenuRightAlt className='text-3xl text-black cursor-pointer' onClick={toggleNavBar} />
                        </div>
                    )
                }
            </nav>
                <div className={`md:hidden absolute z-20 left-0 flex justify-center items-center w-full h-screen bg-white transform transition-transform duration-200 ease-in-out ${openNavBar ? "translate-x-0" : "-translate-x-full"}`}>
                    <div className='flex flex-col items-center space-y-10 p-6 text-gray-500 font-semibold text-lg '>
                        <p>Hi! Admin</p>
                        <button onClick={()=> navigate("/logout",{state:{from:location}})} className='border rounded-full text-sm px-4 py-1'>
                            Logout
                        </button>
                    </div>
                </div>
        </header>
    )
}

export default AdminNavBar