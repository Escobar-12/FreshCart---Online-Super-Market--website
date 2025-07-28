import { useEffect, useRef, useState} from 'react'
import useApplication from '../hooks/applicationHook';
import useAuth from '../hooks/useAuth';
import { FaArrowLeft } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import SafeImage from '../components/SafeImage';
const CartPage = () => {
    const {auth} = useAuth();
    const {navigate,BurnToast, totalAmount, getCartCount, themeColor, products, cartItems, update, deleteItem, clearCart, location} = useApplication();
    const [showAddress, setShowAddress] = useState(false);
    const [addresses,setAddresses] = useState([]);
    const [chooseAddress, setChooseAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [placingOrder, setPlacingOrder] = useState(false);
    const [error, setError] = useState(null);

    const tax = 0;
    const paymentRef = useRef();


    const placeOrder = async () =>
    {
        if(placingOrder) return ;
        try 
        {
            setPlacingOrder(true);
            const orderList = Object.entries(cartItems).map(([productId,qty]) => (
                {
                    item: productId,
                    quantity: qty
                }
            ));

            if(!chooseAddress) return BurnToast("error","Select An Address");

            const res = await fetch("http://localhost:5000/api/orders/addOrder", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                body:JSON.stringify({
                    order: orderList,
                    address:chooseAddress,
                    amount:totalAmount,
                    paymentType:paymentRef.current.value,
                }),
                credentials: "include",
            });
    
            if (!res.ok) return console.log("Failed to get address.");
    
            BurnToast("success", "Order Placed");
            navigate("/");
            scrollTo({"top":0,behavior:"smooth"})

        } 
        catch (err) 
        {
            console.error(err.message);
            setError(err.message || "Something went wrong");
            BurnToast("error", "Can't Place The Order");
        }
        finally
        {
            setPlacingOrder(false)
        }
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
        
                if (!res.ok) 
                {
                    console.log("Failed to get address.");
                    return [];
                }
                const data = await res.json();
                return data;
            } catch (err) {
                BurnToast("error", "Can't Place The Order");
                setError(err.message || "Something went wrong");
                return [];
            } finally {
                setLoading(false);
            }
        };

    const removeAddress = async (addressId) =>
    {
        if(!auth.user) return navigate("/login", { state: { from: location } }) ;
        try
        {
            const res = await fetch("http://localhost:5000/api/info/removeAddress",{
                method:"DELETE",
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


    return (
        <div className='flex flex-col md:flex-row py-16 max-w-6xl w-full mx-auto gap-5'>
            <div className=' w-full flex-1 max-w-4xl'>
                <div className='w-full p flex flex-col items-start md:flex-row justify-between md:items-center pb-10 gap-4'>
                    <h1 className=' text-2xl font-semibold text-nowrap'>
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
                    cartItems && products.filter((item)=>cartItems[item._id]).map((product, i)=>
                    (
                        <div key={i} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">     
                            <div className='flex items-center md:gap-6 gap-3'>
                                <div className='h-24 w24 cursor-pointer flex items-center justify-center border border-gray-300 rounded' onClick={()=> navigate(`/products/${product._id}`)}>
                                    <SafeImage imagePath={product.image[0]}  alt={product.name || "product"} className={" w-fit h-full object-cover" }/>
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
                                                    <option value={cartItems[product._id]}>{cartItems[product._id]}</option>
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
                                <p onClick={() => navigate("/add-address", { state: { from: location } }) } className="text-green-500 text-center cursor-pointer p-2 hover:bg-green-500/10">
                                    Add address
                                </p>
                            </div>
                            )}
                        
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select ref={paymentRef} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>${totalAmount}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax ({tax}%)</span><span>${totalAmount * tax}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span style={{color:themeColor}}>${totalAmount - (totalAmount * tax)}</span>
                    </p>
                </div>

                <button onClick={() => placeOrder()} className="w-full py-3 mt-6 cursor-pointer text-white font-medium " style={{background:themeColor}} disabled={placingOrder}>
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