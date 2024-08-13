import React, { useEffect, useState } from 'react'
import { IoAddOutline } from "react-icons/io5";
import { FiAlignLeft } from "react-icons/fi";
import { useloginContext } from '../context/LoginContext';
import EditProfile from './EditProfile';
import { Link } from 'react-router-dom';

const Profile = () => {
  const {username,userDetails} = useloginContext();
  const [userData,setUserData] = useState(userDetails)
  const [editProfile,setEditProfile] = useState(false)
  const {loggedIn} = useloginContext()
  const [unam , setUnam] = useState(username)
  
  useEffect(() => {
    if(!loggedIn) window.location.href = '/'
  },[])

  useEffect(() => {
      setUserData(userDetails);
      console.log(userDetails)
  },[editProfile])
  
  
  const {name , posts,username:uname,followers,follwings,bio,profileImg} = userData;
  console.log(userDetails)
  return (
    <>
    {editProfile && <EditProfile setEditProfile={setEditProfile} {...userData} setUnam={setUnam}/>}
    <div className="w-full h-[calc(100vh-8vh)] dark:bg-zinc-900 dark:text-white">

        <div className="topPart flex justify-between items-center px-4 py-4 border-b-[1px] border-gray-600">
          <h1 className='text-xl font-bold capitalize'>{uname}</h1>
          <div className="icons flex items-center gap-5">
          <Link to='/messages'>
            <IoAddOutline size={25} className='border-2 rounded-md'/>
           </Link> 
            <FiAlignLeft size={25}/>
          </div>
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
              <p>{followers && followers.length}</p>
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
          <button className='mt-4 py-1 px-2 border-[1px] rounded-md dark:border-gray-400 dark:bg-zinc-800' onClick={() => setEditProfile(true)}>Edit Profile</button>
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
  </>
  )
}

export default Profile