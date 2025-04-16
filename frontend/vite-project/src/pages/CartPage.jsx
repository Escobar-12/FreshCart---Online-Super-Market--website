import { useEffect, useState} from 'react'
import useApplication from '../hooks/applicationHook';
import useAuth from '../hooks/useAuth';

import { FaArrowLeft } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

const CartPage = () => {
    const {auth} = useAuth();
    const {navigate,BurnToast, getCartCount, themeColor, products, cartItems, update, deleteItem, clearCart} = useApplication();
    const [showAddress, setShowAddress] = useState(false);
    const [addresses,setAddresses] = useState([]);
    const [chooseAddress, setChooseAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const placeOrder = async () =>
    {

    }

    const getAddressData = async () => 
        {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("http://localhost:5000/api/info/getAddress", {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${auth?.Access_token}`,
                    },
                    credentials: "include",
                });
        
                if (!res.ok) {
                    const message = await res.text();
                    throw new Error(message || "Failed to get address.");
                }
        
                const data = await res.json();
                return data;
            } catch (err) {
                console.error(err);
                setError(err.message || "Something went wrong");
                return [];
            } finally {
                setLoading(false);
            }
        };

    const removeAddress = async (addressId) =>
    {
        try
        {
            const res = await fetch("http://localhost:5000/api/info/removeAddress",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                body: JSON.stringify({addressId}),
                credentials: "include",
            })
            BurnToast("success", "Address Removed");
            setAddresses(prev => prev.filter(address => address._id !== addressId));

        }
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() => 
    {
        const fetchAddresses = async () => 
        {
            const data = await getAddressData();
            setAddresses(data.addresses);
        };
        fetchAddresses();
    }, []);

    useEffect(()=>
    {
        console.log(addresses)
    },[addresses])

    return (
        <div className='flex flex-col md:flex-row py-16 max-w-6xl w-full mx-auto gap-5'>
            <div className=' w-full flex-1 max-w-4xl'>
                <div className='w-full p flex justify-between items-center pb-10'>
                    <h1 className='text-2xl font-semibold '>
                        Shopping Cart
                        <span className='text-sm tracking-tight px-2' style={{color:themeColor}}>{getCartCount()} items</span>
                    </h1>
                    <button className='text-red-500 px-3 py-2 border-2 hover:bg-red-200 transition-all duration-200 ' onClick={()=> clearCart()}>
                        Empty Cart
                    </button>
                </div>
                
                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>
                
                {
                    products.filter((item)=>cartItems[item._id]).map((product, i)=>
                    (
                        <div key={i} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">     
                            <div className='flex items-center md:gap-6 gap-3'>
                                <div className='h-24 w24 cursor-pointer flex items-center justify-center border border-gray-300 rounded'>
                                    <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                                </div>
                                <div>
                                    <p className="hidden md:block font-semibold">{product.name}</p>
                                    <div className='text-gray-500/80'>
                                        <p>Category: <span>{product.category || ""}</span></p>
                                        <div className='flex items-center'>
                                            <p>Qty:</p>
                                            <select className='outline-none' value={cartItems[product._id]} onChange={(e) => update(product._id, parseInt(e.target.value))}>
                                                {Array(5).fill('').map((_, index) => (
                                                    <option key={index} value={index + 1}>{index + 1}</option>
                                                ))}
                                            </select>

                                        </div>
                                    </div>
                                </div>  
                            </div>
                            <p className='text-center'>${product.offerPrice * cartItems[product._id]}</p>
                            <button className="cursor-pointer p-1 rounded-full mx-auto hover:bg-gray-300 transition-all duration-200" onClick={() =>  deleteItem(product._id)} >
                                <ImCancelCircle className='text-red-500 text-2xl'/>
                            </button>
                        </div>
                    ))
                }
                
            </div>

            {/* Payment */}
            <div className="max-w-[360px] w-full h-fit bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{chooseAddress === null ? "No address found" : `${chooseAddress.street}, ${chooseAddress.city} ${chooseAddress.country}` }</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-green-800 hover:underline cursor-pointer">
                            Change
                        </button>
                            {showAddress && (
                            <div className="absolute top-7 py-1 bg-white border border-gray-300 text-sm w-full">
                                    { addresses?.length > 0 && addresses.map((address, i) => (
                                        <div key={i} className="cursor-pointer relative z-10 flex justify-between items-center text-gray-500 p-2 hover:bg-gray-100 transition-all duration-200">
                                            <p onClick={() => {setShowAddress(false); setChooseAddress(address)}}  className='flex-1'>{address.street + ", " + address.city + " " + address.country}</p>
                                            <div className="p-1 rounded-full hover:bg-gray-300 cursor-pointer transition-all duration-200" onClick={() => removeAddress(address._id)} >
                                                <ImCancelCircle className='text-red-500 text-xl  '/>
                                            </div>
                                        </div>
                                    ))}
                                <p onClick={() => navigate("/add-address")} className="text-green-500 text-center cursor-pointer p-2 hover:bg-green-500/10">
                                    Add address
                                </p>
                            </div>
                            )}
                        
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>$20</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>$20</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>$20</span>
                    </p>
                </div>

                <button onClick={() => placeOrder()} className="w-full py-3 mt-6 cursor-pointer text-white font-medium " style={{background:themeColor}}>
                    Place Order
                </button>

                <button onClick={() => {navigate("/");scrollTo(0,0);}} className="CShopping px-2 cursor-pointer flex items-center mt-8 gap-2 font-medium" style={{color:themeColor}}>
                    <FaArrowLeft className='arrow'/>
                    Continue Shopping
                </button>
            </div>        
        </div>
    )
}
export default CartPage