import React, { useState } from 'react'
import useApplication from '../hooks/applicationHook'
import { assets } from '../../public/assets/assets';
import useAuth from '../hooks/useAuth';

const InputField = ({type, placeHolder, name, handleChange, address})=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-green-800 transition'
        type={type} 
        onChange={handleChange} 
        placeholder={placeHolder} 
        name={name} 
        value={address[name]} 
        required />
)


const AddAddressPage = () => {
    const {themeColor, BurnToast, location, navigate } = useApplication();
    const {auth} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const from = location.state?.from?.pathname || "/";
    const [address, setAddress] = useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:'',
    });

    const handleChange = (e) =>
    {
        const {name, value} = e.target;
        setAddress((prev) => ({...prev, [name]: value}));
    }


    const onSubmitHandler = async (e) => 
    {
        e.preventDefault();

        if(loading) return;

        setLoading(true);
        setError(null);
        try 
        {
            const res = await fetch("http://localhost:5000/api/info/addAddress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                body: JSON.stringify(address),
                credentials: "include",
            });
    
            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to add address.");
            }
            BurnToast("success","New Address Added");
            navigate(from);
    
            console.log("Address added");
        } catch (err) {
            console.error(err);
            BurnToast("error","Failed To Add A New Address")
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='mt-16 pb-16 '>
            <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping  
                <span className='font-semibold' style={{color:themeColor}}> Address</span>
            </p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
                <div className='flex-1 max-w-md'>
                    <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm '>
                        <div className='grid grid-cols-2 gap-4'>
                        <InputField type={"text"} placeHolder={"First Name"} name={"firstName"} handleChange={handleChange} address={address} />
                        <InputField type={"text"} placeHolder={"Last Name"} name={"lastName"} handleChange={handleChange} address={address} />

                        </div>
                            <InputField type={"email"} placeHolder={"Email Address"} name={"email"} handleChange={handleChange} address={address} />
                            <InputField type={"text"} placeHolder={"Street"} name={"street"} handleChange={handleChange} address={address} />
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type={"text"} placeHolder={"City"} name={"city"} handleChange={handleChange} address={address} />
                            <InputField type={"text"} placeHolder={"State"} name={"state"} handleChange={handleChange} address={address} />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <InputField type={"number"} placeHolder={"Zip code"} name={"zipcode"} handleChange={handleChange} address={address} />
                            <InputField type={"text"} placeHolder={"Country"} name={"country"} handleChange={handleChange} address={address} />
                        </div>

                        <InputField type={"text"} placeHolder={"Phone"} name={"phone"} handleChange={handleChange} address={address} />
                        <button disabled={loading} className='w-full mt-6 text-white py-3 hover:brightness-90 transition cursor-pointer uppercase' style={{background:themeColor}}>
                            Save Address
                        </button>
                    </form>
                </div>
                <img src={assets.add_address_iamge} alt="Add Address" />
            </div>
        </div>
    )
}

export default AddAddressPage