import React, { useState } from 'react'
import LoginImg from '../assets/loginImg.png'
import { useloginContext } from '../context/LoginContext';
import axios from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('');
    const {setUser,login,setUserId,setUserDetails} = useloginContext()
    const navigator = useNavigate();

    const handleLoginBtnClick = async (e) => {
        try{
            
            const res =await axios.post('/login' , {username,password})
            login();
            const user = await axios.post('/profileData' , {username})
            setUserDetails(user.data);
            setUser(username);
            navigator('/home')
        }
        catch(e){
            setErrorMsg('Something went wrong')
            console.log(e)
        }
    
    //   window.location.redirect = '/home'
    }

  return (
    <>
        <div className="flex min-h-screen w-screen dark:bg-zinc-800 dark:text-white ">
            <div className="hidden w-full md:flex justify-end md:w-1/2 pt-10 ">
                <div className="bg-black h-fit rounded-[28px] p-1">
                    <img src={LoginImg} alt="login image" className='w-[20vw] h-[45vw]' />
                </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center ">
                <div className="loginForm h-fit md:h-[60vh] display flex flex-col items-center border-2 justify-center py-6 gap-10 md:gap-4 pt-8 px-6 rounded-lg">
                    {errorMsg && <span className='text-red-500 text-lg'>{errorMsg}</span>}
                    <h2 className='font-sans text-3xl'>Instagram</h2>
                    <input type="text" className='border-[1px] mt-4 px-4 py-2 rounded-lg dark:text-black' placeholder='Mobile number or email' value={username} onChange={(e) => setUserName(e.target.value)} />
                    <input type="password" className='border-[1px] px-4 py-2 rounded-lg dark:text-black' placeholder='Password' value={password} 
                    onChange={(e) => setPassword(e.target.value)}/>
                    <button className='bg-blue-500 text-white py-2 rounded-xl w-full' onClick={handleLoginBtnClick}>Login</button>
                    <span>Don't have an account? 
                        <button className='text-blue-500 mt-4' onClick={() => window.location.href='/signup'}>Sign Up</button>
                    </span>
                </div>   
            </div>
        </div>
    </>
  )
}

export default Login