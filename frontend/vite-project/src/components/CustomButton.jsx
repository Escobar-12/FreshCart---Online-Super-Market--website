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
        ...(disable && { opacity: 0.5, cursor: "not-allowed" }),
        color: themeColor,
        background: themeColor,
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

    const baseClasses = `inline-flex items-center gap-2 px-3 py-1 transition-all duration-400 border-3  ${textCenter ? "justify-center" : ""}`
    const dynamicClasses = `${disable?"": customHover ? `active:scale-102 transition-all duration-150`: "Prim_Button"}`

    return href ? (
        <Link to={href} onClick={onClicking} className={`${baseClasses}  ${dynamicClasses}  ${ClassName}`} style={buttonStyle} >
            {content}
        </Link>
    ) : (
        <button disabled={disable} onClick={onClicking} className={`${baseClasses}  ${dynamicClasses}  ${ClassName}`} style={buttonStyle}>
            {content}
        </button>
    );
};

export default ButtonCustom;
