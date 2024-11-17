import React, { useContext, useEffect, useState } from 'react'
import { carContext } from '../context/carContext'
import CarItem from './CarItem'

const CarsDisplay = () => {
    const { carsData, search } = useContext(carContext)
    const [filteredCars, setFilteredCars] = useState([])
    console.log(carsData);
    const handleSearch = () => {
        if (search.trim()) {
            const results =
                carsData.filter(item =>
                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.company.toLowerCase().includes(search.toLowerCase()) ||
                    item.dealer.toLowerCase().includes(search.toLowerCase()) ||
                    item.car_type.toLowerCase().includes(search.toLowerCase())
                )
            setFilteredCars(results)
        }
        else {
            setFilteredCars(carsData)   // Default to all cars when search is empty
        }
    }
    useEffect(() => {
        handleSearch()
    }, [search, carsData])
    return (
        <>
            {carsData.length>0 ?
                <div>
                    <h1 className='font-semibold text-2xl my-4'>Cars List</h1>
                    <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  gap-4'>

                        {
                            filteredCars.map((item, index) => (
                                <CarItem key={index} id={item._id} images={item.images} title={item.title} car_type={item.car_type} company={item.company} dealer={item.dealer} description={item.description} />
                            ))
                        }
                    </div>
                </div>
                :<div className='h-[500px] flex items-center justify-center font-semibold text-2xl'>Cars not Available</div>
            }
        </>

    )
}

export default CarsDisplay