import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import SearchBar from './Searchbar'
import { assets } from '../assets/assets'
import { carContext } from '../context/carContext'
const Navbar = ({ setShowLogin }) => {
    const { token, setToken, navigate } = useContext(carContext)
    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }
    return (
        <div className='navbar flex items-center justify-between pt-2 border-b border-b-gray-300'>
            <Link to="/" className='text-3xl sm:text-5xl logo font-semibold' >Cars</Link>
            <ul className='flex items-center gap-8 text-sm font-medium text-slate-700'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-1/2 border-none h-[1.6px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to="/add" className="flex flex-col items-center gap-1">
                    <p>ADD CAR</p>
                    <hr className='w-1/2 border-none h-[1.6px] bg-gray-700 hidden' />
                </NavLink>
                <SearchBar />
            </ul>
            <div className='flex items-center gap-2'>
                {
                    !token ? <button onClick={() => setShowLogin(true)} className='border border-slate-700 px-5 py-1.5 rounded-full text-sm font-semibold text-slate-700'>Sign in</button>
                        :
                        <div className='group relative'>
                            <div className='w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center cursor-pointer'>
                              <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-5  ' alt="" />  
                            </div>
                            {
                                token &&
                                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                                    <div className='flex flex-col gap-3 w-36 py-3 px-5 bg-slate-200 text-gray-500'>
                                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                                        <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                                    </div>
                                </div>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar