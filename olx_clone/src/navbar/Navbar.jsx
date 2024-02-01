import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/OLX-logo.png';
import { IoIosArrowDown } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import { IoSearch } from 'react-icons/io5';
import { FaLeaf, FaPlus } from 'react-icons/fa6';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../Layout';
import { auth, db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { IoIosLogOut } from "react-icons/io";
import { signOut } from 'firebase/auth';


function Navbar() {
  const navigate=useNavigate()
  const detailofuser=useContext(UserDataContext)
  const [showlog,setShowLog]=useState(false)
  const [logedUser,setLogedUser]=useState('Login')

  function LogoutSetting() {
    signOut(auth)
      .then(() => {
        alert('logout successfully..');
        setLogedUser('Login');
        setShowLog(false);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    try {
      async function fetchdetails() {
        const dbreference = collection(db, 'users');
        const snapshotcollection = await getDocs(dbreference);
        snapshotcollection.docs.forEach((doc) => {
          if (doc.data().id === detailofuser) {
            console.log('this is the data');
            setLogedUser(doc.data().username);
          }
        });
      }
      fetchdetails();
    } catch (error) {
      console.log(error);
    }

    // Cleanup function to reset logedUser when the component unmounts
    // return () => {
    //   setLogedUser('Login');
    // };
  }, [detailofuser]);

  console.log(logedUser)
  return (
    <>
      <div className='w-full h-[75px] bg-white shadow-md fixed'>
        <div className='w-full h-[70px] flex align-middle justify-center items-center bg-gray-100'>
          <div></div>
          <img className='2xl:left-32 left-2 fixed w-[45px] h-[27px]' src={logo} alt="" />
            <div className='flex  2xl:left-44 md:left-14 fixed'>
                <div className='inputborder ml-3 max-md:hidden w-full md:w-[300px] 2xl:w-[250px] bg-white h-[50px] border-2 flex items-center justify-between p-1'>
                    <CiSearch size={25} className='' />
                    <input placeholder='Search city, area or loca...' className='p-2 w-full md:w-[240px] 2xl:w-[180px] 2xl:p-1' />
                    <IoIosArrowDown size={25} />
                </div>
                <div className='inputborder ml-3 w-full max-lg:hidden lg:w-[350px] xl:w-[565px] 2xl:w-[650px] bg-white h-[50px] border-2 flex items-center justify-between'>
                    <input placeholder='Find Cars, Mobile Phones and more...' className='p-2 w-full md:w-[340px]' />
                    <div className='backgoundgreen p-2 text-white'><IoSearch size={30} className='' />
                </div>
            </div>

          </div>

          <div className='flex greenycolor items-center fixed right-4  md:right-0 lg:right-0 xl:right-14  2xl:right-36'>
            <div className='flex max-md:hidden text-sm font-bold'>ENGLISH<IoIosArrowDown size={21} /></div>
            
            {logedUser!='Login'?(<div className='flex font-bold underline ml-4 cursor-pointer'
             onClick={()=>{
              if (logedUser!='Login'){
                setShowLog(!showlog)
              }}}>{logedUser}</div>):<div className='flex font-bold underline ml-4 cursor-pointer'
              onClick={()=>{navigate('/login')
               }}>{logedUser}</div>}
            <div className='sell-button flex items-center shadow-sm font-bold px-3 cursor-pointer bg-white ml-3' onClick={()=>navigate(`/sell?u=${detailofuser}`)}><FaPlus size={19} />&nbsp;SELL</div>
            {showlog&&(logedUser!='Login')?(<div className=' rounded bg-white absolute top-16 right-24 cursor-pointer shadow-md p-3 font-semibold' onClick={()=>LogoutSetting()}>logout</div>):''}
          </div>
        </div>
      </div>
      <div className='w-full h-[80px]'></div>

    </>
  );
}

export default Navbar;
