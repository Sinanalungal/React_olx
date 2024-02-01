import React, { useContext, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import logo from '../assets/OLX-logo.png';
import '../Login/Login.css'
import Cutombackbutton from '../Cutombackbutton';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db ,storage } from '../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { UserDataContext } from '../Layout';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Sell() {
    const loc=useLocation()
    const searchParams=new URLSearchParams(loc.search);
    const userdetail=searchParams.get('u')
    const [productName,setProductName]=useState('')
    const [category,setCategory]=useState('')
    const [brand,setBrand]=useState('')
    const [price,setPrice]=useState('')
    const [location,setLocation]=useState('')
    const [description,setDescription]=useState('')
    const [image,setImage]=useState('')


    async function imageToStore() {
        const imageref = ref(storage, `images/${image.name}`);
        await uploadBytes(imageref, image);
        const downloadURL = await getDownloadURL(imageref);
        return downloadURL;
    }
    
    async function sellProduct(){
        if (productName.trim()!=''&&category.trim()!=''&&brand.trim()!=''&&Number(price)>0&&location.trim()!=''&&description.trim()!=''&&image){
            const imageUrl=await imageToStore()
            const date=new Date()
            try{
                const newUuid = uuidv4();
                // console.log(newUuid)
                // console.log(userdetail)
                await setDoc(doc(db,'products',newUuid),{
                    productname:productName,
                    category:category,
                    brand:brand,
                    price:Number(price),
                    location:location,
                    description:description,
                    image:imageUrl,
                    date:`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
                    user:userdetail,
                    id:newUuid
                });
                
                // await setDoc(refereceofdata,{
                //     productname:productName,
                //     category:category,
                //     brand:brand,
                //     price:Number(price),
                //     location:location,
                //     description:description,
                //     image:imageUrl,
                //     date:`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
                //     user:userdetail
                // })
                // console.log('added successfully')
                alert('product added successfully..')
                setProductName('')
                setCategory('')
                setBrand('')
                setPrice('')
                setLocation('')
                setDescription('')
                setImage('')
            }catch(error){
                console.log(error)
            }
        }else{
            alert('give product details')
        }
    }
  return (
    <>
    <div className='w-full  bg-gray-200 flex items-center justify-center'><div className='lg:w-[35%] drop-shadow-lg w-[100%] py-4 rounded-md bg-white border'>
        <div className='w-full cursor-pointer' onClick={()=>Cutombackbutton()}><IoMdArrowRoundBack size={25} className='mt-4 ml-4'/></div>
    
        <div className='w-full mt-9 text-2xl mb-10 font-bold flex items-center justify-center'>
            <span>Sell Product</span>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <input className='border-2  backgoundgreenlogin' value={productName}  onChange={(e)=>setProductName(e.target.value)} placeholder='Product Name'></input>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <input className='border-2  backgoundgreenlogin' value={category}  onChange={(e)=>setCategory(e.target.value)} placeholder='Category'></input>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <input className='border-2  backgoundgreenlogin' value={brand}  onChange={(e)=>setBrand(e.target.value)} placeholder='Brand'></input>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <input type='number' className='border-2  backgoundgreenlogin' value={price}  onChange={(e)=>setPrice(e.target.value)} placeholder='Price'></input>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <input className='border-2  backgoundgreenlogin' value={location}  onChange={(e)=>setLocation(e.target.value)} placeholder='Location'></input>
        </div>
        <div className='w-full mt-3 flex items-center justify-center'>
            <textarea className='border-2   backgoundgreenlogin' value={description}  onChange={(e)=>setDescription(e.target.value)} placeholder='Description'></textarea>
        </div>
        <div className='w-full mt-1 px-14 font-semibold  flex  justify-start text-xs' >
            images
        </div>
        <div className='w-full  flex items-center justify-center'>
            <input type='file' className='border-2 py-2 text-sm font-semibold backgoundgreenlogin' onChange={(e)=>setImage(e.target.files[0])}></input>
        </div>
        {image?(<div className='w-full mt-3 flex items-center justify-center' >
            <img className=' w-[100px]' src={image?URL.createObjectURL(image):''} alt="" />
        </div>):''}
        <div className='w-full mt-7 font-bold text-white flex items-center justify-center'>
            <button className='border-2  backgoundgreenbutton' onClick={()=>sellProduct()}>Sell</button>
        </div>
        

        </div></div>
    </>
  )
}

export default Sell