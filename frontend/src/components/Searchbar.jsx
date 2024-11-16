import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { carContext } from '../context/carContext'

const SearchBar = () => {
    const {search,setSearch } = useContext(carContext)
    return(
        <div className='text-center min-w-[350px]'>
            <div className='flex items-center justify-center border border-gray-700 px-5 py-2.5  my-5 rounded-full'>
                <input type="text" onChange={(e)=>setSearch(e.target.value)} value={search} placeholder='Search for Cars' className='w-full outline-none bg-inherit text-sm'/>
                <img src={assets.search} className='w-4 cursor-pointer' alt="" />
            </div>
        </div>
    )
}

export default SearchBar