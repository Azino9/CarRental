import React from 'react'
import Sidebar from '../../Components/Owner/Sidebar'
import NavbarOwner from '../../Components/Owner/NavbarOwner'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../hooks/useAppContext'
import { useEffect } from 'react'

const Layout = () => {
  const {isOwner, navigate } = useAppContext() ;

  useEffect(() => {
    if(!isOwner){
      navigate('/') ;
    }
  }, [isOwner]) ;
  
  return (
    <div className=' flex flex-col ' >
        <NavbarOwner />

        <div className=' flex ' >
            <Sidebar />
            <Outlet />
        </div>
    </div>
  )
}

export default Layout