import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Here we will define all the global states and functions that we want to share across our app

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    //  Cars where we will store the list of cars fetched from the backend
    const [cars, setCars] = useState([]);

    // Now some function to get data from the backend
    
    // Function to check if the user is logged in or not
    const fetchUser = useCallback(async () => {
        try {
            const {data} = await axios.get('/api/user/data');
            if(data.success){
                setUser(data.user);
                setIsOwner(data.user.role === 'owner');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [navigate]);

    // Function to fetch all  cars from the backend
    const fetchCars = async () => {
        try {
            const {data} = await axios.get('/api/user/cars');
            data.success ? setCars(data.cars) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    //  Function to logout the user 
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization'] = '' // Remove token from axios headers
        toast.success("Logged out successfully");
        navigate('/');
    };

    // useEffect to retrive the token from local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token)
        fetchCars()
    }, []);

    // useEffect to fetch user data if token exists
    useEffect(() => {
        if(token){
            axios.defaults.headers.common['Authorization'] = `${token}`;
            fetchUser();
        }
    }, [token, fetchUser]);

    const value = { 
        navigate,currency,axios,
        token,setToken,
        user,setUser,fetchUser,
        isOwner,setIsOwner,
        showLogin,setShowLogin,
        pickupDate,setPickupDate,returnDate,setReturnDate,
        cars,setCars,fetchCars,logout
     };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};





// Now we have to provide the suport of this appcontext to our entire app
// So we will go to main.jsx and wrap our app with this AppProvider