import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



const Input = ({value, onChange, palceholder, label, type, className, valid, ref }) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleEye = () =>
    {
        setShowPassword(!showPassword);
    }
    return (
        <div className=''>
            <label htmlFor={label} >{label}
                <span className={valid && value ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={!valid && value ? "invalid" : "hide" }>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>
            <div className={`flex justify-between items-center text-lg p-2 rounded-md border-2 bg-neutral-700 ${className}`} >
                    <input type={type === "password" ? showPassword ? "text" : "password" : type} id={label} 
                        ref={ref}
                        placeholder={palceholder}
                        className='w-full bg-transparent outline-none'
                        value = {value}
                        onChange={onChange}
                    />

                {
                    type === "password" && (
                        <>
                            {!showPassword ? (
                                <FaEye size={22}
                                    className='cursor-pointer'
                                    onClick={toggleEye}/>
                            ) : 
                            (
                                <FaEyeSlash size={22}
                                    className='cursor-pointer'
                                    onClick={toggleEye}/>
                            )}
                        </>
                    )
                }   
            </div>
                
            
        </div>
    )
}

export default Input