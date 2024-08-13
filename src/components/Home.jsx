import React, { useEffect, useState } from 'react'
import { IoAddOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Posts from './Posts';
import { useloginContext } from '../context/LoginContext';
import axios from '../../axiosConfig';
import { Link } from 'react-router-dom';

const Home = () => {
  const {login,logout,setUser,loggedIn,username,userDetails,setUserDetails} = useloginContext()
  const [ispostLiked , setIsPostLiked] = useState(false);

  useEffect(() => {
    if(!loggedIn) window.location.href = '/'
  })

  const [feedData,setFeedData] = useState([]);
    const getUserData = async () => {

        const res = await axios.post('/getFeedData' , {username});
        
        setFeedData(res.data.posts);
    }

    useEffect(() => {
        getUserData();
    },[])

  return (
    <div className="w-full h-[calc(100vh-8vh)] overflow-y-scroll overflow-x-hidden">
        <div className="nav flex justify-between sticky top-0 left-0 bg-white px-8 py-2 border-b-2 shadow items-center">
          <h1 className='text-xl font-serif'>Instagram</h1>
          <div className="flex gap-4 text-md items-center">
            <span className='border-2 border-black px-1 py-1 rounded-lg'>
            <Link to='/messages'><IoAddOutline size={25}/></Link> </span>
            <span><FaRegHeart size={25}/></span>
          </div>
        </div>

        {/* <div className="storySection px-4 h-[15vh] md:h-[30vh] flex w-min items-center border-b-[1px] gap-4 overflow-x-scroll">
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div>
            <div className="h-[21vw]  w-[21vw] md:h-[15vh] md:w-[15vh] rounded-full bg-green-500"></div> 
        </div> */}
        <div className="postsParts mb-[8vh]">
          {feedData.length > 0 && feedData.map(post => {
            console.log(post,username);
            return (
              <Posts key={post._id} username={username}  {...post}/>
            )
          })}
        </div>
    </div>
  )
}

export default Home