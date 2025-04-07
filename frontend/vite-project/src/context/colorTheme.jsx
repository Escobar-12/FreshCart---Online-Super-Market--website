import { createContext, useState, useEffect } from "react";

const ColorContext = createContext({});


export const ColorProvider = ({children}) =>
{
    const [themeColor, setThemeColor] = useState("#14b9e6");

    useEffect(() => 
    {
        const rootColor = getComputedStyle(document.documentElement).getPropertyValue("--colo");
        if (rootColor) setThemeColor(rootColor);
    }, []);

    return(
        <ColorContext value={{themeColor, setThemeColor}}>
            {children}
        </ColorContext>
    );
    
}


export default ColorContext;