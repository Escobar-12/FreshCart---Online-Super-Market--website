import React, { useEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useApplication from '../hooks/applicationHook';
import Image from '../components/Image.jsx';
import CircularProgress from '../components/CircularProgress.jsx';
import SafeImage from '../components/SafeImage.jsx';
const MyOrdersPage = () => {
    const {auth} = useAuth();
    const {themeColor, products} = useApplication();

    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    const loadingMoreRef = useRef(false);
    const [canLoadMore, setCanLoadMore ] = useState(true); 
    const [imageError, setImageError] = useState(false);

    const getMyOrders = async () => 
    {
        try 
        {
            const res = await fetch(`http://localhost:5000/api/orders/allOrders/${page}`, {
                headers: {
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) return console.log("Failed to fetch orders, " + data.message);
            
            if(data.orders.length > 0) setMyOrders(prev => [...prev, ...data.orders]);
            else setCanLoadMore(false);
        } catch (err) {
            console.log(err);
            setCanLoadMore(false);
        } finally {
            setLoading(false);
            loadingMoreRef.current = false;
            
        }
    };
    

    useEffect(()=>
    {
        console.log(page)
        getMyOrders();
    },[page])


    useEffect(() => 
    {
        const handleScroll = () => 
        {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = window.innerHeight;
            if (canLoadMore && scrollTop + clientHeight >= scrollHeight - 500 && !loadingMoreRef.current) 
            {
                loadingMoreRef.current = true;
                setPage(prev => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    


    if (loading && myOrders.length === 0)
        return <div className="flex justify-center mt-20">Loading...</div>;

    if (!loading && myOrders.length === 0)
        return <div className="flex justify-center mt-20">No Records Available</div>;

    return (
        <div className='mt-16 pb-16'>
            <div className='group flex flex-col items-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>My Orders</p>
                <div className='w-[35%] h-0.5 bg-green-600 rounded-full group-hover:w-full transition-all duration-200'>

                </div>
            </div>
            {myOrders.map((order,i)=>(
                <div key={i} className='border border-gray-300 rounded-lg mb-10 p-4 py5 max-w-4xl'>
                    <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col '>
                        <span>OrderId : {order._id}</span>
                        <span>Payment : {order.paymentType}</span>
                        <span>Total Amount : ${order.amount}</span>
                    </p>
                    {
                        order.list.map((items, i) => {
                            const matchedProduct = products.find(product => product._id === items.item);
                            if (!matchedProduct) return null;
                        
                            return (
                                <div key={i} className={`relative bg-white text-gray-500/70 border-b border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl `}
                                >
                                    <div className="flex items-center mb-4 md:mb-0 gap-3">
                                        <div className="bg-green-800/8 p-4 rounded-lg">
                                            <SafeImage className="w-16 h-16" imagePath={matchedProduct.image[0]} alt={matchedProduct.name || "product"}/>
                                        </div>
                                        <div>
                                            <h2 className="text-xl text-gray-800 font-medium">{matchedProduct.name}</h2>
                                            <p className=" text-sm">Category: {matchedProduct.category}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col justify-center md:ml-8 md-4 md:mb-0' >
                                        <p>Quantity: {items.quantity || "1"}</p>
                                        <p>Status: {order.status}</p>
                                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className='text-lg font-medium' style={{color:themeColor}}>
                                        Amount: ${matchedProduct.offerPrice * items.quantity}
                                    </div>
                                </div>
                            );
                            
                        })
                    }
                    
                    <div className='w-full flex items-center mt-4 text-gray-400 md:font-medium'>
                        <p ><span className='font-semibold '>Address </span> : {order.address.street}, {order.address.city} {order.address.country}</p>
                    </div>


                </div>
            ))}
            {canLoadMore && 
                (<CircularProgress color="#4fbf8b" />)
            }
            
        </div>
    )
}

export default MyOrdersPage