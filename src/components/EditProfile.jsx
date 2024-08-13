
import axios from '../../axiosConfig';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useloginContext } from '../context/LoginContext';



const EditProfile = ({setEditProfile,bio,name,username,setUnam,profileImg:imgUrl}) => {
  const {setUser,setUserDetails,userDetails} = useloginContext();
  const [nm,setNm] = useState(name);
  const [unm,setUnm] = useState(username);
  const [bi,setBi] = useState(bio);
  console.log(imgUrl)

  const handleSubmit = async() => {  
    const res = await axios.post('/editProfile' , {name:nm,username:unm,bio:bi,oldUser:username})
    setUser(res.data.username);
    setUnam(res.data.username);
    console.log(res.data);
    setUserDetails(ex => {
      return {...ex , name:nm,username:unm,bio:bi}
    })
    setEditProfile(false)
  }


  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    formData.append('username' , username)
    console.log(formData.get('image'))
    const config = {headers: {'Content-Type': 'multipart/form-data'}}
    try{
     const res = await axios.post('/uploadImage',formData,config);
     console.log(res.data);
     setUserDetails(e => {
      return {...e , profileImg:res.data};
    })
    }
    catch(e){
      console.log(e);
    }
    setEditProfile(false);
  }



  return (
    <div className='h-screen z-20 absolute inset-0 dark:text-white bg-white dark:bg-zinc-900 w-full px-6 py-6'>
      <FaArrowLeft size={25} className='dark:text-white ' onClick={() =>setEditProfile(false)}/>
      <div className="w-full pt-12 flex flex-col justify-center items-center">
          <div className="border-[1px] border-gray-600 h-32 w-32 rounded-full overflow-hidden">
            <img className='w-full h-full object-cover object-center' src={`http://localhost:3000/${imgUrl}`} alt="" />
          </div>
          <div className="relative">
              <input type="file" className='top-2 absolute opacity-0' onChange={handleChange}/>
            <span className='dark:text-blue-800 text-xl mt-3 block'>Change Profile</span>
          </div>
      </div>
          <div className="changes mt-8 px-8  py-4 ">
            <input type="text" className=' outline-none  border-b-[1px]  w-full py-2 border-gray-600' value={nm} onChange={(e) => setNm(e.target.value)}  placeholder='Name' />
            <input type="text" className=' outline-none border-b-[1px] w-full py-2 border-gray-600' value={unm} onChange={(e) => setUnm(e.target.value)} placeholder='Username' />
            <input type="text" className=' outline-none border-b-[1px] w-full py-2 border-gray-600' value={bi} onChange={(e) => setBi(e.target.value)} placeholder='Bio' />
            <button className='bg-blue-500 text-white py-2 rounded-xl w-full mt-10' onClick={handleSubmit}>Save</button>
          </div>
    </div>
  )
}

export default EditProfile