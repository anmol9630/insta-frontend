import React from 'react'
import { FaSearch } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { FaPlay } from "react-icons/fa6";
import { AiFillMessage } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { IoAddOutline } from "react-icons/io5";
import { useloginContext } from '../context/LoginContext';

const Footer = () => {
    const {username,userDetails} = useloginContext();
  return (
    <div className="w-full flex fixed border-t-[1px] shadow h-[8vh] z-10 justify-between px-8 items-center bottom-0 bg-white">
        <Link to='/home'>
            <AiFillHome size={25}/>
        </Link>
        <Link to='/search'>
            <FaSearch size={25}/>
        </Link>
        <Link to='/messages'> 
            <IoAddOutline size={25}/>
        </Link>
        <Link to='/profile'>
            {/* {userDetails?.profileImg} */}
            <div className="w-6 h-6 rounded-full overflow-hidden">
            <img src={`http://localhost:3000/${userDetails?.profileImg}`} className="w-full h-full object-cover object-center" alt="" />
            </div>
        </Link>
    </div>
  )
}

export default Footer