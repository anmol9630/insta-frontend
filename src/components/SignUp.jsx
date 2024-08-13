import axios from '../../axiosConfig'
import React, { useState } from 'react'
import LoginImg from '../assets/loginImg.png'
import { useloginContext } from '../context/LoginContext'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [name , setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username,setUsername ] = useState('')
  const navigate = useNavigate();

  const {login,setUser,setUserDetails} = useloginContext();

  const handleSubmit = async(e) => {
    const user = await axios.post('/signup', {name,username,email,password})
    console.log(user);
    if(user.statusText === 'OK'){
      login();
      const user = await axios.post('/profileData' , {username})
      setUserDetails(user.data);
      setUser(username);
      navigate('/home')
    }
    else{
      alert('Something went wrong');
    }
  }

  return (
    <div className="flex min-h-screen w-screen dark:bg-zinc-800 dark:text-white ">
            <div className="hidden w-full md:flex justify-end md:w-1/2 pt-10 ">
                <div className="bg-black h-fit rounded-[28px] p-1">
                    <img src={LoginImg} alt="login image" className='w-[20vw] h-[45vw]' />
                </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center ">
                <div className="loginForm h-fit md:h-[60vh] display flex flex-col items-center border-2 justify-center py-6 gap-10 md:gap-4 pt-8 px-6 rounded-lg">
                    <h2 className='font-sans text-3xl'>Instagram</h2>
                    <input type="text" className='border-[1px] mt-4 px-4 py-2 rounded-lg dark:text-black' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                    <input type="text" className='border-[1px] px-4 py-2 rounded-lg dark:text-black' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="email" className='border-[1px] mt-4 px-4 py-2 rounded-lg dark:text-black' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className='border-[1px] px-4 py-2 rounded-lg dark:text-black' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className='bg-blue-500 text-white py-2 rounded-xl w-full ' onClick={handleSubmit}>Sign Up</button>
                    <span>Already have an account? 
                        <button className='text-blue-500 mt-4' onClick={() => window.location.href='/login'}>login</button>
                    </span>
                </div>
                
            </div>
        </div>
  )
}

export default SignUp