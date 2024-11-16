import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { carContext } from '../context/carContext'
import { toast } from 'react-toastify'

const Login = ({ setShowLogin }) => {
    const { backendUrl, token, setToken,navigate } = useContext(carContext)
    const [currentState, setCurrentState] = useState("Login")
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setData(data => ({ ...data, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (currentState === 'Sign Up') {
            const response = await axios.post(backendUrl + '/api/user/register', data)
            if (response.data.success) {
                const token = response.data.token
                setToken(token)
                localStorage.setItem('token', token)
                navigate('/')
                setShowLogin(false)
            }
        }
        else {
            const response = await axios.post(backendUrl + '/api/user/login', data)
            if (response.data.success) {
                const token = response.data.token
                setToken(token)
                localStorage.setItem('token', token)
                navigate('/')
                setShowLogin(false)
                toast.success("Logged in")
            }
        }
    }

    return (
        <div className='absolute z-10 w-screen h-screen bg-[#00000090] grid'>
            <form onSubmit={handleSubmit} className='bg-white p-6 place-self-center rounded-md w-[380px]'>
                <div className='title flex items-center justify-between'>
                    <h1 className='font-semibold text-xl'>{currentState}</h1>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} className='cursor-pointer' alt="" />
                </div>
                <div className='my-4'>
                    {currentState === "Login" ? <></> : <input type="text" onChange={handleChange} value={data.name} name='name' className='border border-gray-600 w-full px-2 py-1.5 mt-4 rounded-md' placeholder='Your Name' required />}
                    <input type="email" onChange={handleChange} value={data.email} name='email' className='border border-gray-600 w-full px-2 py-1.5 mt-4 rounded-md' placeholder='Your Email' required />
                    <input type="text" onChange={handleChange} value={data.password} name='password' className='border border-gray-600 w-full px-2 py-1.5 mt-4 rounded-md' placeholder='Password' required />
                </div>
                <button type='submit' className='rounded-md bg-black text-white px-2 py-1.5 mb-4 w-full'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className='flex gap-2 items-start'>
                    <input type="checkbox" className='mt-2' required />
                    <p> By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                <div>
                    {currentState === 'Login' ?
                        <p className='my-4'>Create a new account? <span className='font-semibold cursor-pointer' onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                        : <p className='my-4'>Already have an account? <span className='font-semibold cursor-pointer' onClick={() => setCurrentState("Login")}>Login here</span></p>
                    }
                </div>
            </form>
        </div>
    )
}

export default Login