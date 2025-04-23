import Image from "./Image";
import useAuth from "../hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import ButtonCustom from "./CustomButton";
import useApplication from "../hooks/applicationHook";

const UserProfile = () => {
    const { auth } = useAuth();
    const {checkAdmin} = useApplication();
    const [openDialog, setOpenDialog] = useState(false);
    const dialogRef = useRef(null);
    const imageRef = useRef(null);
    const {themeColor} = useApplication();
    const [check, setCheck] = useState(false);


    const toggleDialog = () => {
        setOpenDialog((prev) => !prev);
    };
    
    const checkInBoxClicks = (e) =>
    {
        if( openDialog &&
            dialogRef.current && !dialogRef.current.contains(e.target) && 
            imageRef.current && !imageRef.current.contains(e.target) )
        {
            setOpenDialog(false);
        }
    }

    useEffect(() => {
        if (dialogRef.current) {
            if (openDialog) {
                dialogRef.current.show();
                document.addEventListener("click",checkInBoxClicks);

            } else {
                dialogRef.current.close();
                document.removeEventListener("click",checkInBoxClicks);
            }
        }

        return () =>
        {
            document.removeEventListener("click",checkInBoxClicks);
        }
    }, [openDialog]);

    useEffect(() => 
    {
        const verifyAdmin = async () => 
        {
            const isAdmin = await checkAdmin();
            setCheck(isAdmin);
        };
        verifyAdmin();
    }, [auth?.user]);
    
    return (
        <div className="relative inline-block">
            <div className="rounded-full cursor-pointer" onClick={toggleDialog} ref={imageRef}>
                <Image 
                    path={auth?.img || "user.png"} 
                    className="w-10 h-10 rounded-full object-cover shadow-sm" 
                />
            </div>

            <dialog 
                ref={dialogRef} 
                className="absolute max-lg:block left-1/2 transform -translate-x-1/2 mt-2 w-50 border-2 border-green-200 shadow-lg rounded-lg bg-white "
            >
                <div className="PostList flex flex-col items-center space-y-5 p-4 rounded-lg">
                    <h1 className="text-sm font-bold" style={{color:themeColor}}>
                        Hello, {auth?.user || "Guest"}!
                    </h1>

                    {check && <ButtonCustom href={`/seller`} label="Dashboard" bold={true} large={false} onClick={() => setOpenDialog(false)} disable={false}/>}

                    <ButtonCustom href={`/my-orders`} label="My Orders" bold={true} large={false} onClick={() => setOpenDialog(false)} disable={false}/>

                    <ButtonCustom href="/logout" label="Log out" bold={true} large={false} onClick={() => setOpenDialog(false)} disable={false}/>

                    <button 
                        className="mt-2 w-full bg-gray-200 hover:brightness-90 px-3 py-1 rounded-md transition" 
                        style={{background:themeColor}}
                        onClick={toggleDialog}>
                        Close
                    </button>
                </div>
            </dialog>
        </div>
    );
};

export default UserProfile;
