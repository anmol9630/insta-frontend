import React from 'react'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import { LoginProvider } from '../context/LoginContext'


const Layout = () => {

  return (    
    <>  
      
        <Outlet/>
        <Footer/>
    
    </>
  )
}

export default Layout