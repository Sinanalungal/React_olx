import React from 'react'
import './Card.css'
import { useNavigate } from 'react-router-dom'
function Card({id,values}) {
  console.log(values)
  console.log(id)

  const navigate=useNavigate()
  const limitedDescription = values.description.substring(0, 40);

  return (
    <>
    <div className=' max-sm:mx-auto mt-3 cursor-pointer  xl:mx-auto w-[300px] border border-gray-400 rounded-sm  p-2 ' onClick={()=>navigate(`/productdetails?pdt=${id}`)}>
        <div className=' h-[160px] p-1' style={{
          backgroundImage: `url(${values.image})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}>
            {/* <img src={values.image} className='cover' /> */}
        </div>
        <div className='overflow-hidden'>
            <div className='font-bold w-full text-2xl '>₹{values.price}</div>
            <div className='text-base'>{values.productname}</div>
            <div className='mt-1 text-gray-500 text-sm'>{limitedDescription}...</div>
            <div className='mt-2 text-gray-500 text-xs '><span>{values.location}</span> <span className='float-end'>{values.date}</span></div>
        </div>
    </div>
    </>
    
  )
}

export default Card