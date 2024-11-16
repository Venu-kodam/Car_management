import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { carContext } from '../context/carContext';
import ImageSlider from './ImageSlider';
import { assets } from '../assets/assets';

const CarDetails = () => {
  const { carId } = useParams()
  const{backendUrl,token} = useContext(carContext)
  const[data,setData] = useState("")
  const fetchCarDetails = async()=>{
    const response = await axios.post(backendUrl+"/api/cars/single",{carId})
    console.log(response);
    if(response.data.success){
      setData(response.data.car)
    }
    console.log(data);
  }
  useEffect(()=>{
    fetchCarDetails()
  },[carId])
  return (
    <div className='flex justify-between gap-8 border px-4 py-6 '>
        <div className='w-1/2 overflow-hidden'>
          <ImageSlider images = {data.images && data.images} backendUrl={backendUrl}/>
        </div>
        <div className='w-1/2'>
          <p className='font-semibold text-3xl'>{data.title} <span className='text-sm'>({data.car_type})</span></p> 
          <p>by {data.company}</p>
          <div className='flex items-center gap-1 mt-3'>
          <p>4.5 </p>
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_icon} alt="" className='w-3.5' />
            <img src={assets.star_dull} alt="" className='w-3.5' />
            <p className='pl-3 text-sm'>326 Reviews</p>
          </div>
          <p className='text-sm text-gray-500 my-2'>{data.description}</p>
          <p className='my-4'>Dealer: {data.dealer}</p>
          <button className='bg-orange-600 text-white outline-none px-4 w-[150px] py-2 rounded-md text-sm my-4'>Im Interested</button>
        </div>
    </div>
  )
}

export default CarDetails