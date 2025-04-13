import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ApplicationContext = createContext({});

export const ApplicationProvider = ({ children }) => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState({});

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

    const removeFromCart = (item) => {
        let cartData = structuredClone(cartItems);
        if (cartData[item]) {
            cartData[item] -= 1;
            if (cartData[item] === 0) delete cartData[item];
            setCartItems(cartData);
            BurnToast("success","Removed from Cart");
        }
    };

    // Burn toast
    const [toastCount, setToastCount] = useState(0);
    const BurnToast = (type="success",message) =>
    {
        if(toastCount >= 1) return console.log("Too Much Toast");
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

    // color Provider 
    const [themeColor, setThemeColor] = useState("#4fbf8b");

    useEffect(() => 
    {
        const rootColor = getComputedStyle(document.documentElement).getPropertyValue("--colo");
        if (rootColor) setThemeColor(prev => rootColor || prev );
    }, []);


    return (
        <ApplicationContext value={{ cartItems, addToCart, update, removeFromCart, navigate, BurnToast, themeColor}}>
            {children}
        </ApplicationContext>
    );
};

export default ApplicationContext;
