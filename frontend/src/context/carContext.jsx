import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cars_data } from "../assets/assets";
import axios from "axios";
export const carContext = createContext(null)

const CarContextProvider = ({children})=>{
    const backendUrl = "http://localhost:4000"
    const [token, setToken] = useState('')
    const[carsData,setCarsData] = useState([])
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const fetchCarsList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/cars/list');
            console.log(response.data); // Log to confirm data structure
            if (response.data.success) {
                setCarsData(response.data.cars);
            } else {
                console.error("Failed to fetch cars:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    }
    
    useEffect(() => {
        async function loadData(){
            await fetchCarsList()
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
            }
        }
        loadData()
    }, [token])
    const contextValue = {
        backendUrl,token, setToken,navigate,cars_data,carsData,setCarsData,
        fetchCarsList,search, setSearch
    }
    return (
        <carContext.Provider value={contextValue}>
            {children}
        </carContext.Provider>
    )
}
export default CarContextProvider