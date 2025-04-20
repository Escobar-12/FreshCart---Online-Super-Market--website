import React from "react";
import { FaChevronRight } from "react-icons/fa";


const AnimatedButton = () => {
    return (
        <button className="custom-button p-2 rounded-full cursor-pointer border-black">
            <div className="circle"></div>
            <span className="arrow text-white rounded-full"><FaChevronRight/></span>
            <span className="button-text relative z-10 ml-10 mr-3 font-bold uppercase">
                Explore deals
            </span>
        </button>
    );
};

export default AnimatedButton;
