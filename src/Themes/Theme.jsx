import React, { useEffect, useState } from 'react';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
const Theme = () => {
    const [dark, setDark] = useState(()=>{
        return localStorage.getItem("theme")==="dark"
    })

    useEffect(()=>{
const theme= dark? "dark":"light";

document.documentElement.setAttribute("data-theme",theme)
localStorage.setItem("theme",theme)


    },[dark])
    const handleTheme =() =>{
        const newTheme = !dark
        setDark(newTheme)

        document.documentElement.setAttribute("data-theme",newTheme?"dark":"light")
    }
    return (
        <div>
            <button className='btn btn-circle' onClick={()=>setDark(!dark)}>
                {dark? <MdOutlineDarkMode />:<MdDarkMode />}

            </button>
        </div>
    );
};

export default Theme;