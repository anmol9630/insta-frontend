import React, { useState } from 'react'
import {useloginContext} from '../context/LoginContext'
import axios from '../../axiosConfig'

const AddPost = () => {

  const [imgUrl , setImgUrl] = useState('');
  const [caption,setCaption] = useState('');
  const [file,setFile] = useState([]);

  const {username} = useloginContext();
  console.log(username);

  const handleSubmitClick = async() => {
    const formData = new FormData();
    formData.append('image' , file);
    formData.append('caption' , caption);
    formData.append('username' , username);
    const config = {headers: {'Content-Type': 'multipart/form-data'}}
    const res = await axios.post('/uploadPost' , formData);
    console.log(res.data);
  }


  return (
    <div className="w-full h-[100vh-8vh] dark:bg-zinc-900 px-20 py-32">
        <div className="addImg flex flex-col justify-center items-center relative">
            <div className="bg-gray-500 h-32 w-32 rounded-full">
              {/* <img src={imgUrl} className='w-full h-full object-cover object-center' alt="" /> */}
            </div>
            <div className="relative w-fit mt-3">
                <span className='text-xl font-semibold dark:text-blue-600 mt-3 cursor-pointer'>Add Image</span>
                <input type="file" className='absolute bottom-0 left-0 opacity-0 w-full' onChange={(e) => setFile(e.target.files[0])} />
            </div>
        </div>

        <div className="captions mt-20 w-full">
          <p className='text-xl font-medium'>Caption :</p>
          <textarea className='outline-none w-full border-[1px] mt-4 mb-8 block' onChange={(e) => setCaption(e.target.value)} value={caption}></textarea>
          <button className='bg-blue-600 text-white px-4 py-2 w-fit mx-auto rounded-xl' onClick={handleSubmitClick}>Upload</button>
        </div>
    </div>
  )
}

export default AddPost