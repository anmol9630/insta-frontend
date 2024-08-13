import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { useloginContext } from '../context/LoginContext';
import axios from '../../axiosConfig';

const Posts = ({user,postImg ,likes,_id,username,caption}) => {
    const [postLikes , setPostLikes] = useState(likes)
    const [liked , setLiked] = useState(false);
    const {userDetails,setUserDetails} = useloginContext()
    const toogleLike = async() => {
        const res = await axios.post('/likePost' , {username:userDetails._id,postId:_id});
        setPostLikes(res.data.likes);
        setLiked(!liked);
    }

    const isPostLiked = async() => {
        const isliked = likes.findIndex((e) => e == userDetails._id);
        if(isliked != -1){
            setLiked(true);
        }
    }

    useEffect(() => {
        isPostLiked();
    },[])
   

  return (
    <div className="w-full mb-4 ">
        <div className="topPart flex justify-between items-center">
            <div className="imgName flex gap-3 items-center border-t-2 w-full px-4 py-2">
                <div className="img rounded-full h-12 w-12 overflow-hidden">
                <img src={`http://localhost:3000/${user.profileImg}`} className='w-full h-full object-cover object-center' />
                </div>
                <div className="">
                    <p className='font-bold leading-none'>{user.username}</p>
                    <p className='text-sm text-gray-500'>Orignal Audio</p>
                </div>
            </div>
        </div>
        <div className="max-h-[60vh] w-full md:w-1/3 mx-auto bg-blue-500 overflow-hidden">
            <img src={`http://localhost:3000/${postImg}`} className='w-full h-full object-cover object-center' />
        </div>
        <div className="bottomPart w-full ">
       
            <div className="px-4 flex justify-between items-center">
                <div className="flex gap-1 items-center pt-2">
                    {!liked ? (<FaRegHeart size={25} onClick={toogleLike}/>) : (<IoMdHeart size={25} className='fill-red-600' onClick={toogleLike}/>) }    
                    {postLikes.length}
                </div>
            </div>
            <div className="caption w-full px-4">
                <p>{caption}</p>
            </div>
        </div>
    </div>
  )
}

export default Posts