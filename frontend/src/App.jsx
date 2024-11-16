import React, { useContext, useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CarDetails from './components/carDetails'
import AddCar from './pages/AddCar'
import { carContext } from './context/carContext'
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const { token } = useContext(carContext)
  return (
    <>
      <ToastContainer />
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className='app px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <Navbar setShowLogin={setShowLogin} />
        {token ?
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add' element={<AddCar />} />
            <Route path='/car/:carId' element={<CarDetails />} />
            <Route path='/update/:carId' element={<AddCar />} />
          </Routes>
        :<div className='h-[500px] flex items-center justify-center font-semibold text-2xl'>Cars not Available</div>}
      </div>
    </>

  )
}

export default App