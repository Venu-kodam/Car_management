import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { carContext } from '../context/carContext'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddCar = () => {
    const { backendUrl, token, navigate,fetchCarsList } = useContext(carContext)
    const [images, setImages] = useState([])
    const { carId } = useParams()
    const [data, setData] = useState({
        title: '',
        description: '',
        car_type: '',
        dealer: '',
        company: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setData(data => ({ ...data, [name]: value }))
    }

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };
    useEffect(() => {
        if (!carId) return;
        const fetchCarDetails = async () => {
            const response = await axios.post(backendUrl + "/api/cars/single", { carId })
            const { car } = response.data;
            setData({
                title: car.title,
                description: car.description,
                car_type: car.car_type,
                dealer: car.dealer,
                company: car.company,
            });
        }
        fetchCarDetails()
    }, [carId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('car_type', data.car_type)
        formData.append('dealer', data.dealer)
        formData.append('company', data.company)
        // Append images only if they are selected
        if (images.length > 0) {
            images.forEach(image => formData.append('images', image));
        }

        try {
            let response
            if (carId) {
                response = await axios.put(backendUrl + `/api/cars/update/${carId}`, formData, { headers: { token } })
                console.log(response);
            }
            else {
                response = await axios.post(backendUrl + '/api/cars/add', formData, { headers: { token } })
                console.log(response);
            }
            toast.success(response.data.message);
            navigate('/'); // Redirect after success
            fetchCarsList()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='my-8 px-8  py-4 w-[700px] shadow-md shadow-gray-600 rounded-lg'>
                <div >
                    <p className='my-2 font-semibold text-md'>Upload Images</p>
                    <label htmlFor="image" className='cursor-pointer'>
                        <img src={images.length > 0 ? assets.upload_added : assets.upload_img} className='w-24' alt="" />
                        <input onChange={handleImageChange} type="file" id='image' hidden multiple />
                    </label>
                </div>
                <div className='my-4'>
                    <p className='my-2 font-semibold text-md'>Car Name</p>
                    <input onChange={handleChange} value={data.title} name='title' type="text" placeholder='Type here' className='w-full px-3 py-1.5  border border-gray-500' required />
                </div>
                <div className='my-4'>
                    <p className='my-2 font-semibold text-md'>Car Description</p>
                    <textarea onChange={handleChange} value={data.description} name='description' placeholder='Type description here' rows={4} className='w-full px-3 py-1.5  border border-gray-500' required />
                </div>
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 '>
                    <div>
                        <p className='my-2 font-semibold text-md'>Car Company</p>
                        <input type="text" onChange={handleChange} name='company' value={data.company} placeholder='Enter Company of Car' className='w-full px-3 py-1.5  border border-gray-500' required />
                    </div>
                    <div>
                        <p className='my-2 font-semibold text-md'>Car Type</p>
                        <input type="text" onChange={handleChange} name='car_type' value={data.car_type} placeholder='Enter type of Car' className='w-full px-3 py-1.5  border border-gray-500' required />
                    </div>
                    <div>
                        <p className='my-2 font-semibold text-md'>Car Dealer</p>
                        <input type="text" onChange={handleChange} name='dealer' value={data.dealer} placeholder='Enter Car Dealer' className='w-full px-3 py-1.5  border border-gray-500 ' required />
                    </div>
                </div>
                <div className='flex  justify-center'>
                    <button type='submit' className='bg-black text-white my-6 px-4 w-28 py-1.5 rounded-sm '>{carId ? "Update" : "Add Car"}</button>
                </div>
            </form>
        </div>
    )
}

export default AddCar