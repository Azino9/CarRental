import React,{useState} from 'react'
import { assets,menuLinks } from '../assets/assets'
import {Link} from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

    // This is to change the navbar color based on the page we are on home so it will be light otherwise white, logic is written inside the className
    const location = useLocation();
    const [open,setOpen] = useState(false);
    const navigate = useNavigate();

  return (
    <div className={` flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all
    ${location.pathname === "/" && "bg-light"} `} >

        {/* Whenever we click on the logo it should redirect us to Home */}
        <Link to='/' > 
        <img src={assets.logo} alt="Logo" className=' h-8 '  />
        </Link>

        <div className={` max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t
        border-borrderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 
        transition-all duration-300 z-50 ${location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"} `} >

            {/* MenuLink data is already in the assesst.js */}
            {menuLinks.map((link, idx)=>(
                <Link to={link.path} key={idx}>
                    {link.name}
                </Link>
            ))}

            {/* The Hidden below in className if it is mobile Screen and show for medium and above medium /large screeen */}
            <div className=' hidden lg:flex items-center text-sm gap-2 border border-borderColor px-3 rounded-full max-w-56 ' >
                <input type="text" className=' py-1.5 w-full bg-transparent outline-none placeholder-gray-500 ' placeholder='Search products' />
                <img src={assets.search_icon} alt="Search" />
            </div>

            <div className=' flex max-sm:flex-col items-start sm:items-center gap-6 ' >
                <button onClick={()=> navigate('/owner')} className=' cursor-pointer ' >Dashboard</button>
                <button onClick={()=> setShowLogin(true)} className=' cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg ' >Login</button>
            </div>
        </div>

        <button className=' sm:hidden cursor-pointer ' aria-label='Menu' onClick={()=> setOpen(!open)} >
            <img src={open ? assets.close_icon : assets.menu_icon } alt="" />
        </button>

    </div>
  )
}

export default Navbar