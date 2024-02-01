import React, { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from '../assets/OLX-logo.png';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import Cutombackbutton from '../Cutombackbutton';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const navigate=useNavigate()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [userdata,setUserData]=useState()
    const submitLogin=()=>{
        signInWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
            console.log(userCredentials.user.uid)
            setUserData(userCredentials.user.uid)
            navigate('/')
        }).catch((error)=>alert('Invalid User'))
    }
  return (
    <>
    <div className='w-full h-lvh bg-gray-200 flex items-center justify-center'><div className='lg:w-[35%] drop-shadow-lg w-[100%] h-[570px] rounded-md bg-white border'>
        <div className='w-full cursor-pointer' onClick={()=>Cutombackbutton()}><IoMdArrowRoundBack size={25} className='mt-4 ml-4'/></div>
        <div className='w-full mt-7 flex items-center justify-center'>
            <img className='w-[70px]' src={logo} alt="" />
        </div>
        <div className='w-full mt-9 mb-10 font-bold flex items-center justify-center'>
            <span>Enter Email and Password</span>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <input type='email' className='border-2  backgoundgreenlogin' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' required></input>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <input type='password' className='border-2  backgoundgreenlogin' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' required></input>
        </div>
        <div className='w-full mt-7 font-bold text-white flex items-center justify-center'>
            <button type='submit'  className='border-2  backgoundgreenbutton' onClick={()=>submitLogin()}>Login</button>
        </div>
        <div className='w-full mt-7 text-xs font-semibold flex items-center justify-center'>
            <a className='border-2 create cursor-pointer' onClick={()=>navigate('/signup')}>Create an account</a>
        </div>
        </div></div>
    </>
  )
}

export default Login