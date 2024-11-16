import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { carContext } from '../context/carContext'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
const CarItem = ({ id, title, images, description,car_type }) => {
  const { backendUrl, token, fetchCarsList, navigate } = useContext(carContext)
  
  const removeCar = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/cars/remove", { id }, { headers: { token } })
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchCarsList()
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='shadow-gray-600 shadow-lg rounded-xl overflow-hidden'>
      <Link to={`/car/${id}`} className='text-gray-800 cursor-pointer'>
        <div className='overflow-hidden'>
          <img src={backendUrl + "/images/" + images[0]} alt="" className='hover:scale-110 transition ease-in ' />
        </div>
        <div className='px-4'>
          <div className='flex items-center justify-between'>
            <p className='pt-3 pb-1 text-lg text-gray-600 font-semibold'>{title}</p>
            <p className='pt-3 pb-1 text-[12px] text-gray-600'>{car_type}</p>
          </div>
          <p className='pt-3 pb-1 text-sm text-gray-500'>{description}</p>
        </div>
      </Link>
      <div className='border-t flex items-center justify-between px-8 py-2 mt-4'>
        <FaEdit className='cursor-pointer' onClick={() => navigate(`/update/${id}`)} style={{ fontSize: '25px' }} />
        <MdDelete className='cursor-pointer' onClick={() => removeCar(id)} style={{ fontSize: '25px' }} />
      </div>
    </div>

  )
}

export default CarItem