import React, { useEffect, useState } from 'react'
import { AiOutlineShareAlt } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import avtar from '../assets/avtar.webp'
import { IoIosArrowForward } from "react-icons/io";
import './ProductContent.css'
import Layout from '../Layout';
import { useLocation } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore'; 
import { db } from '../Firebase'; 

function ProductContent() {
  const [detail, setDetail] = useState('');
  const location = useLocation();
  const [sellerDetail,setSellerDetail] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const searchParam = new URLSearchParams(location.search);
      const pdtid = searchParam.get('pdt');
      // console.log(pdtid, 'this');
      const docref = doc(db, 'products', pdtid);
      const detail = await getDoc(docref);
      setDetail(detail.data());
      // console.log(detail.data(), 'thisone');
    };

    fetchData(); 
    
  }, []);
  useEffect(()=>{
    async function fetchSellerDetail() {
      if( detail.user!=''){
        try{
          console.log(detail)
          console.log(detail.user)

          const userdocref=doc(db,'users',detail.user)
          console.log(userdocref)
          const seller=await getDoc(userdocref)
          console.log(seller.data(),'thhis one')
          setSellerDetail(seller.data())
        }catch(error){
          console.log(error)
        }
      }  
      
    }
    fetchSellerDetail();
    console.log(sellerDetail)

  },[detail])
  return (
    <>
    <Layout>
    <div className='w-full py-4 xl:h-[750px] h-[1300px] grid xl:flex md:justify-center  bg-gray-200' >
      <div className=' lg:w-[830px]   h-[670px] rounded-md'>
        <img className='h-[450px]   max-lg:w-full object-contain lg:w-[830px] rounded-md bg-black'  src={detail.image} alt="" />
        <div className='description rounded-md   mt-1 p-4 h-[280px] bg-white xl:h-[230px] border'>
          <div className='text-xl font-bold'>Details</div>
          <div className='text-md py-3 lg:w-[50%] w-[100%]'><span className='text-gray-500'>Category</span><span className='float-right'>{detail.category}</span></div>
          <div className='text-md  lg:w-[50%] w-[100%]'><span className='text-gray-500'>Brand</span><span className='float-right'>{detail.brand}</span></div>
          <hr className='text-gray-500 mt-2'/>
          <div className='text-xl font-bold mt-4'>Description</div>
          <div className='text-sm py-3 '>{detail.description}</div>
        </div>
      </div>
      <div className=' xl:ml-4 xl:w-[400px]  h-[400px] rounded-md max-sm:w-full'>
        <div className=' h-[160px] border bg-white  rounded-md p-3'>
          <div className='font-bold text-3xl'>
            <span>₹{detail.price}</span>
            <span className='float-end flex'>
              <AiOutlineShareAlt size={24}/>
              <IoMdHeartEmpty size={24} className='ml-2'/>
            </span>
          </div>
          <div className='text-gray-600 mt-4'>{detail.productname}</div>
          <div className='text-xs mt-8'><span>{detail.location}</span> <span className='float-right ml-1'>{detail.date}</span></div>
        </div>
        <div className='h-[160px]  border bg-white   rounded-md mt-4  flex flex-col justify-between p-4'>
        <div className='flex items-center'>
          <img className='w-[45px] rounded-[100px]' src={avtar} alt="" />
          <span className='ml-2 font-bold w-full'>{sellerDetail.username}</span>
          {/* <span className='text-black ml-[305px] lg:ml-[650px] xl:ml-[230px]'><IoIosArrowForward /></span> */}

        </div>
        <span className='font-semibold text-sm'>Email: {sellerDetail.email}</span>
        <div className='px-2 py-2 border border-black cursor-pointer flex justify-center font-bold mt-1 rounded-md'>Chat with Seller</div>
        </div>



        <div className=' h-[100px] border bg-white   rounded-md mt-4  p-4'>
        <div className='font-bold text-2xl'>
            <span>Posted In</span>
            
          </div>
          <div className='text-xs mt-4'><span>{detail.location}</span> <span className='float-right'>{detail.date}</span></div>
        </div>
      </div>
    </div>
    </Layout>
    </>
  )
}

export default ProductContent