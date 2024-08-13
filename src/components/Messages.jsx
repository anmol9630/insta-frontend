import React, { useEffect, useState } from 'react'
import { useloginContext } from '../context/LoginContext';
import axios from '../../axiosConfig';
import { useNavigate} from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import {useFileHandler} from '6pp';

const Messages = () => {
  // const [file,setFile] = useState({});
  const [caption, setCaption] = useState('');
  const [imgUrl ,setImgUrl] = useState(null)
  const navigator = useNavigate();
const {username,loggedIn,setUserDetails} = useloginContext();
const {file , changeHandler , preview} = useFileHandler('single');

useEffect(() => {
  if(!loggedIn) window.location.href = '/'
})

  const handleSubmitClick = async() => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);
    formData.append('username',username);
    console.log(formData.get('username'))
    const config = {headers: {'Content-Type': 'multipart/form-data'}}
    const res = await axios.post('/uploadPost' , formData,config);
    const data = await axios.post('/profileData' , {username});
    setUserDetails(data.data);
    navigator('/home')
  }

  const handleFileInput = (e) => {
    changeHandler(e);
    setImgUrl(preview);
    console.log(e.target.files[0])
  }

  console.log({preview});

  return (
      <>
        <FaArrowLeft size={25} className='mx-4 my-4' onClick={() => navigator('/home')}/>
          <div className="w-full h-[100vh-8vh] dark:bg-zinc-900 px-20 py-32">
            
          <div className="addImg flex flex-col justify-center items-center relative">
              <div className="bg-gray-500 overflow-hidden h-32 w-32 rounded-full">
                {imgUrl &&  <img src={preview} className='w-full h-full object-cover object-center' alt="" />}
              </div>
              <div className="relative w-fit mt-3">
                  <span className='text-xl font-semibold dark:text-blue-600 mt-3 cursor-pointer'>Add Image</span>
                  <input type="file" className='absolute bottom-0 left-0 opacity-0 w-full' onChange={handleFileInput}  />
              </div>
          </div>

          <div className="captions mt-20 w-full">
            <p className='text-xl font-medium'>Caption :</p>
            <textarea className='outline-none w-full border-[1px] mt-4 mb-8 block' onChange={(e) => setCaption(e.target.value)} value={caption}></textarea>
            <button className='bg-blue-600 text-white px-4 py-2 w-fit mx-auto rounded-xl' onClick={handleSubmitClick}>Upload</button>
          </div>
      </div>
      </>
  )
}

export default Messages