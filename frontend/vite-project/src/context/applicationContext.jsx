import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

const ApplicationContext = createContext({});

export const ApplicationProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {auth} = useAuth();
    const [cartItems, setCartItems] = useState( JSON.parse(localStorage.getItem("cart")) || {});

    const update = (item, quantity) => {
        let cartData = structuredClone(cartItems);  
        cartData[item] = quantity;
        setCartItems(cartData);
        BurnToast("success","Cart updated");
    };

    const addToCart = (item) => {
        let cartData = structuredClone(cartItems);
        cartData[item] = (cartData[item] || 0) + 1;
        setCartItems(cartData);
        BurnToast("success","Added to Cart");
    };

    const deleteItem = (item) =>
    {
        let cartData = structuredClone(cartItems);
        delete cartData[item];
        setCartItems(cartData);
        BurnToast("success","Removed from Cart");

    }

    const removeFromCart = (item) => {
        let cartData = structuredClone(cartItems);
        if (cartData[item]) {
            cartData[item] -= 1;
            if (cartData[item] === 0) delete cartData[item];
            setCartItems(cartData);
            BurnToast("success","Removed from Cart");
        }
    };

    const clearCart = () =>
    {
        setCartItems({});
        BurnToast("success","Cart Cleared");
    }

    const getCartCount = () =>
    {
        let totalCount = 0;
        for(const i in cartItems)
        {
            totalCount += 1;
        }
        return totalCount;
    }

    const getTotalAmount = () =>
    {
        let totalAmount = 0;
        for(const i in cartItems)
        {
            const item = products.find((product) => product._id === i);
            totalAmount += item.offerPrice * cartItems[i]
        }
        return totalAmount;
    }

    // Burn toast
    const [toastCount, setToastCount] = useState(0);
    const BurnToast = (type="success",message) =>
    {
        if(toastCount >= 1) return ;
        switch(type)
        {
            case "success" : toast.success(message,{className:"w-sm"}); break;
            case "error" : toast.error(message); break;
            case "warning" : toast.warning(message); break;
        }
        setToastCount(prev => prev+1);
        setTimeout(() => {
            setToastCount(prev => Math.max(prev - 1, 0));
        }, 3800);
    }

    // products 
    const [products,setProducts] = useState([]);
    const fetchProducts = async()=>
    {
        try
        {
            const getIT = async()=>{
                const res = await fetch("http://localhost:5000/api/product/allProducts",
                    {
                        headers:{
                            authorization: `Bearer ${auth?.Access_token}`,
                        },
                        credentials:"include",
                    }
                );
                if(!res.ok) return console.log("Error");
                const data = res.json();
                return data;
            }
            const data = await getIT();
            setProducts(data.products);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    // color Provider 
    const [themeColor, setThemeColor] = useState("#4fbf8b");

    useEffect(() => 
    {
        const rootColor = getComputedStyle(document.documentElement).getPropertyValue("--colo");
        if (rootColor) setThemeColor(prev => rootColor || prev );
    }, []);

    // query search 
    const [searchQuery, setSearchQuery] = useState("");
    const [searchCategory, setSearchCategory] = useState("");

    // gen stars
    const genStars = (rating) =>
    {
        const stars = [];
        for(let i=1;i<=5;i++)
        {
            if(rating > i)
            {
                stars.push(<FaStar key={i} className="text-green-500" />);
            }
            else if(rating >= i-0.5)
            {
                stars.push(<FaStarHalfAlt key={i} className="text-green-500" />)
            }
            else { stars.push(<FaRegStar key={i} className="text-green-500" />) }
        }
        return stars;
    }


    useEffect(()=>
    {
        fetchProducts();
    },[]);

    useEffect(()=>
    {
        localStorage.setItem("cart",JSON.stringify(cartItems));
    },[cartItems])
    useEffect(()=>
    {
        console.log(products)
    },[products])


    return (
        <ApplicationContext.Provider value={{ cartItems, addToCart, update, removeFromCart, deleteItem, clearCart, navigate, location, genStars, products, BurnToast, themeColor, searchQuery, setSearchQuery, searchCategory, setSearchCategory, getTotalAmount, getCartCount}}>
            {children}
        </ApplicationContext.Provider>
    );
};

export default ApplicationContext;
