import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useColor from "../hooks/useColorTheme.jsx";
import useButtonHoverEffect from "./ButtonHoverEffect.jsx"

const ButtonCustom = ({
    href = "",
    label = "Click Me",
    imgsrc = null,
    large = true,
    textCenter = false,
    bold = false,
    roundedFull = true,
    disable = true,
    Ricon = null,
    ClassName = "",
    onClicking,
    newColor=null, 
    customHover=false,
}) => {
    const {themeColor} = useColor();
    useButtonHoverEffect();

    const buttonStyle = {
        backgroundColor: newColor||themeColor,
        borderColor: newColor || themeColor,
        opacity: disable ? 0.5 : 1,
        cursor: disable ? "not-allowed" : "pointer",
    };

    const content = (
        <>
            <span className={`${large ? "text-xl" : "text-"} ${bold ? "font-semibold" : ""} z-10 `} >
                {label}
            </span>
            {imgsrc && <img src={imgsrc} alt="icon" className="z-20 w-5 h-5 border-2 rounded-full" style={{ borderColor: themeColor }} />}
            {Ricon && <Ricon className="z-20"/>}
        </>
    );

    const baseClasses = `inline-flex items-center gap-2 px-2 py-1 border-2 text-white ${roundedFull ? "rounded-full" : "rounded"} ${textCenter ? "justify-center" : ""}`
    const dynamicClasses = `${disable?"": customHover ? `active:scale-102 transition-all duration-150`: "Prim_Button"}`

    return href ? (
        <Link to={href} onClick={onClicking} className={`Prim_Button inline-flex items-center gap-2 px-2 py-1 border-2 text-white ${roundedFull ? "rounded-full" : "rounded"} ${textCenter ? "justify-center" : ""} `} style={buttonStyle}>
            {content}
        </Link>
    ) : (
        <button disabled={disable} onClick={onClicking} className={`${baseClasses} + ${dynamicClasses} + ${ClassName}`} style={buttonStyle}>
            {content}
        </button>
    );
};

export default ButtonCustom;
