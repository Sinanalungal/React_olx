import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from '../assets/OLX-logo.png';
import '../Login/Login.css'
import { useNavigate } from 'react-router-dom';
import Cutombackbutton from '../Cutombackbutton';
import { auth } from "../Firebase"
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { FaLeaf } from 'react-icons/fa6';
function Signup() {
    const navigate=useNavigate()
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [UsersRef,setUref]=useState()
    // const [emailpresent,SetEmailPresent]=useState(false)
    // const [UCSnapshotRef,setUCref]=useState()
    // console.log(UsersCollectionRef)
    useEffect(()=>{
        setUref(collection(db,'users'))
    },[])
    // function mapingofdata(){

    // }
    // ------------------------------------------------------------
    async function submission(){
        try{
            const snapshot=await getDocs(UsersRef)
            let emailExists=false
            snapshot.docs.forEach((doc) => {
                console.log(doc.data());
                if (doc.data().email === email) {
                    // SetEmailPresent(true);
                    emailExists = true;
                }
            });
            if (!emailExists){( createUserWithEmailAndPassword(auth,email,password).then((UserCredentials)=>{
                console.log(UserCredentials.user.uid)
                setDoc(doc(db,"users",UserCredentials.user.uid),{id:UserCredentials.user.uid,username:username,email:email,password:password});
                // const user = UserCredential.user;
                alert('User succussfully created!!!')
                setUsername('')
                setEmail('')
                setPassword('')
                navigate('/login')
                }).catch((error)=>alert('Invalid Email')))
            }else{
                alert('email already taken ')
            }
            // SetEmailPresent(snapshot.docs.some((doc) => doc.data().email === email))

            // snapshot.forEach((doc) => {
            //     if (doc.data().email === email) {
            //       setEmailPresent(true);
            //     }
            // }
        }catch(error){
            alert('error during signup',error)
        }
        //     console.log(!emailExists)
        //     if(!emailExists){
        //         createUserWithEmailAndPassword(auth,email,password).then((UserCredentials)=>{
        //             console.log(UserCredentials.user.uid)
        //             // const user = UserCredential.user;
        
        //         }).catch((error)=>alert('Invalid Email'))
        //     }else{
        //         alert('email is already used')
        //     }
        // }catch(error){
        //     alert('error during signup',error)
        // }finally{
        //     SetEmailPresent(false)
        // }
        
        // SetEmailPresent(false)
        
    }
// -----------------------------------------
// async function submission() {
//     try {
//         const snapshot = await getDocs(UsersRef);
//         let emailExists = false;

//         snapshot.docs.forEach((doc) => {
//             console.log(doc.data());
//             if (doc.data().email === email) {
//                 emailExists = true;
//             }
//         });

//         if (!emailExists) {
//             createUserWithEmailAndPassword(auth, email, password)
//                 .then((UserCredentials) => {
//                     console.log(UserCredentials.user.uid);
//                     // Additional actions after successful user creation
//                 })
//                 .catch((error) => alert('Invalid Email'));
//         } else {
//             alert('Email is already used');
//         }

//         console.log(!emailExists);
//     } catch (error) {
//         alert('Error during signup', error);
//     }
// }

// -------------------------------------
  return (
    <>
    <div className='w-full h-lvh bg-gray-200 flex items-center justify-center'><div className='lg:w-[35%] drop-shadow-lg w-[100%] h-[570px] rounded-md bg-white border'>
        <div className='w-full cursor-pointer' onClick={()=>Cutombackbutton()}><IoMdArrowRoundBack size={25} className='mt-4 ml-4'/></div>
        <div className='w-full mt-7 flex items-center justify-center'>
            <img className='w-[70px]' src={logo} alt="" />
        </div>
        <div className='w-full mt-9 mb-10 font-bold flex items-center justify-center'>
            <span>Create Account</span>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <input className='border-2  backgoundgreenlogin' value={username} placeholder='Username' onChange={(e)=>setUsername(e.target.value)}></input>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <input type='email' className='border-2  backgoundgreenlogin' value={email} placeholder='Email' onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <input type='password' className='border-2  backgoundgreenlogin' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        <div className='w-full mt-7 font-bold text-white flex items-center justify-center'>
            <button className='border-2  backgoundgreenbutton' onClick={()=>submission()}>Create</button>
        </div>
        <div className='w-full mt-7 text-xs font-semibold flex items-center justify-center'>
            <a className='border-2 create cursor-pointer' onClick={()=>navigate('/login')}>Login with account</a>
        </div>




        </div></div>
    </>
  )
}

export default Signup