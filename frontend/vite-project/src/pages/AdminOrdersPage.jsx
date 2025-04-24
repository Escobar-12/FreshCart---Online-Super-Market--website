import { useEffect, useState, useRef } from 'react'
import { PiPackageFill } from "react-icons/pi";
import useAuth from '../hooks/useAuth';
import CircularProgress from '../components/CircularProgress.jsx';



const AdminOrdersPage = () => {
    const {auth} = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);

    const loadingMoreRef = useRef(false);
    const [canLoadMore, setCanLoadMore ] = useState(true); 

    const getOrders = async () => 
    {
        try 
        {
            const res = await fetch(`http://localhost:5000/api/orders/AdminOrders`, {
                headers: {
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) return console.log("Failed to fetch orders, " + data.message);
            
            if(data.orders.length > 0) setOrders(prev => [...prev, ...data.orders]);
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
            getOrders();
        },[page])

        useEffect(()=>
        {
            console.log(orders)
        },[orders])
    

    useEffect(()=>
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
        }
        document.addEventListener("scroll", handleScroll)
        return ()=>
        {
            document.removeEventListener("scroll", handleScroll)
        }
    },[])
    if (loading && orders.length === 0)
        return <div className="flex justify-center mt-20">Loading...</div>;

    if (!loading && orders.length === 0)
        return <div className="flex justify-center mt-20">No Records Available</div>;

    return (
        <div className="md:p-10 p-4 space-y-4">
            <h2 className='text-lg font-medium' >Orders List</h2>
            {
                orders.length > 0 && orders.map((order, i)=>
                (
                    <div key={i} className='border rounded-md border-gray-400 flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl text-gray-800'>
                        <div className="flex gap-5">
                            <PiPackageFill className='text-gray-400 text-4xl'/>
                            {/* <div>
                                {order.items.map((item,i)=>
                                (
                                    <div key={i} className="flex flex-col justify-center">
                                        <p className="font-medium">
                                            {item.product.name} <span className={`text-green-500 ${item.quantity < 2 && "hidden"}`}>x {item.quantity}</span>
                                        </p>
                                    </div>
                                ))}
                            </div> */}
                        </div>
                        <div className="text-sm">
                            <p className='font-medium mb-1'>{order.address.firstName} {order.address.lastName}</p>
                            <p>{order.address.street}, {order.address.city}, {order.address.state},{order.address.zipcode}, {order.address.country}</p>
                        </div>

                        <p className="font-medium text-base my-auto text-black/70">${order.amount}</p>
                        <div className="flex flex-col text-sm">
                            <p>Method: {order.paymentType}</p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                        </div>
                    </div>
                ))
            }
            {canLoadMore && 
                (<CircularProgress color="#4fbf8b" />)
            }
        </div>
    )
}

export default AdminOrdersPage