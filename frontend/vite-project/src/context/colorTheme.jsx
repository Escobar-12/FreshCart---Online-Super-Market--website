import { createContext, useState, useEffect } from "react";

const ColorContext = createContext({});


export const ColorProvider = ({children}) =>
{
    const [themeColor, setThemeColor] = useState("#4fbf8b");

    useEffect(() => 
    {
        const rootColor = getComputedStyle(document.documentElement).getPropertyValue("--colo");
        if (rootColor) setThemeColor(prev => rootColor || prev );
    }, []);

    return(
        <ColorContext value={{themeColor, setThemeColor}}>
            {children}
        </ColorContext>
    );
    
}


export default ColorContext;