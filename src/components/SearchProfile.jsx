import React, { useEffect, useState } from 'react'
import { useloginContext } from '../context/LoginContext';
import axios from '../../axiosConfig';
import { FaArrowLeft } from "react-icons/fa";

const SearchProfile = (props) => {
    const [isliked ,setIsLiked ] = useState(false);
    const {_id , name , username , profileImg,posts,followers,follwings,bio,setViewProfile,setSearch} = props;
    const {username:unm,userDetails,setUserDetails} = useloginContext();
    const [foll , setFoll] = useState(followers?.length);
    const handleFollowToogle = async (e) => {
        e.preventDefault();
        const res = await axios.post('/addFriend' , {username:unm,addUser:_id})
        const data = res.data;
        console.log(data);
        setFoll(data.secUser.followers.length);
        setUserDetails(data.data);
        setIsLiked(!isliked);
    }

    useEffect(() => {
      console.log(unm ,_id )
      console.log(userDetails.follwings);
      const s = userDetails.follwings.findIndex((e) => e == _id)
      console.log(s);
      if(s != -1){
        setIsLiked(true)
      }
      else{
        setIsLiked(false)
      }
    },[])

  return (
    <div className="w-full h-screen bg-white inset-0 fixed">
        <div className="w-full h-[calc(100vh-8vh)] dark:bg-zinc-900 dark:text-white">

<div className="px-2 py-4">
    <FaArrowLeft size={25} onClick={() => setViewProfile(false)}/>
</div>

<div className="profilePart px-4 pt-8 flex items-center justify-between">
  <div className="profileImg h-24 w-24 border-[1px] border-gray-600 rounded-full overflow-hidden ">
    <img src={`http://localhost:3000/${profileImg}`} className="w-full h-full object-cover object-center" alt="" />
  </div>
  <div className="info flex gap-4">
    <div className="posts text-center">
      <p>{posts && posts?.length}</p>
      <p>Posts</p>
    </div>
    <div className="posts text-center">
      <p>{foll}</p>
      <p>Followers</p>
    </div>
    <div className="posts text-center">
      <p>{follwings && follwings.length}</p>
      <p>Following</p>
    </div>
  </div>
</div>

<div className="bioPart px-4 py-4">
  <h2 className='text-lg capitalize'>{name}</h2>
  <p className='text-sm text-gray-400'>{bio?.length > 0 ? bio : 'No bio'} </p>
  <div className="px-10 mt-10">
    <button className='w-full rounded-lg bg-blue-600 py-2 text-white' onClick={handleFollowToogle}>{isliked ? 'UnFollow' : 'Follow'}</button>
  </div>
</div>

    {posts && posts.length>0 ? (
    <div className="posts grid grid-cols-3 gap-4 my-10 px-2">
        {posts.map(post => (
            <div className="bg-gray-500 h-32 md:min-h-32">
            <img src={'http://localhost:3000/'+post?.postImg} alt=""  className='w-full h-full object-cover object-center'/>
            </div>
        ))}
    </div>
    ):(
    <p className='text-center text-gray-400'>No posts yet</p>
    )}
   
</div>

    </div>
  )
}

export default SearchProfile