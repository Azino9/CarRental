import React ,{useEffect, useState} from 'react'
import Title from '../Components/Title'
import { assets} from '../assets/assets'
import CarCard from '../Components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import toast from 'react-hot-toast';
import {motion} from 'motion/react'


const Cars = () => {

  //  getting search params from URL
  const  [searchParams] = useSearchParams() ;
  const pickupLocation = searchParams.get('pickupLocation') ;
  const pickupDate = searchParams.get('pickupDate') ;
  const returnDate = searchParams.get('returnDate') ;
  
  const {cars, axios} = useAppContext();

    // For the search input so that we can toggle the value
  const [input, setInput] = useState("");

  // If we have search data then filter the cars based on location , pickup date and return date
  const isSearchData = pickupLocation && pickupDate && returnDate ;

  const [filteredCars, setFilteredCars] = useState([]);

  const applyFilter = async() => {
    if(input === ''){
      setFilteredCars(cars) ;
      return null
    }

    const filtered = cars.slice().filter((car) => {
      return (car.brand?.toLowerCase() || '').includes(input.toLowerCase())
        || (car.name?.toLowerCase() || '').includes(input.toLowerCase())
        || (car.model?.toLowerCase() || '').includes(input.toLowerCase())
        || (car.category?.toLowerCase() || '').includes(input.toLowerCase())
        || (car.transmission?.toLowerCase() || '').includes(input.toLowerCase());
    })

    setFilteredCars(filtered) ;
  }

  const searchCarAvailability = async() => {
    try {
      // Debug log to check values before API call
      console.log('searchCarAvailability payload:', { pickupLocation, pickupDate, returnDate });
      if (!pickupLocation || !pickupDate || !returnDate) {
        toast.error('Please provide location, pickup date, and return date');
        return;
      }
 
      if (new Date(returnDate) < new Date(pickupDate)) {
      toast.error("Return date cannot be before pickup date");
            return;       
      }

      const {data} = await axios.post('/api/bookings/check-availability',{
        location: pickupLocation, pickupDate, returnDate})


      if(data.success){

        setFilteredCars(data.AvailableCars)
        if(data.AvailableCars.length === 0){
          toast("No cars available for the selected location and dates.")
        }
        return null
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  }

  useEffect(()=>{
    isSearchData && searchCarAvailability() ;
  },[])
  
useEffect(()=>{
    cars.length > 0 && !isSearchData && applyFilter() ;
}, [input, cars])


  return (
    <div>
        <motion.div
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: "easeOut" }}
         className=' flex flex-col items-center py-20 bg-light max-md:px-4  ' >
          <Title title='Available Cars' subTitle=' Discover our extensive range of vehicles available for rent.' />

          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5,  delay: 0.3 }}
           className=' flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow ' >

          <img src={assets.search_icon} alt="" className=' w-4.5 h-4.5 mr-2 '  />

          <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search by car name, model, or location' className=' w-full h-full outline-none text-gray-500 ' />

          <img src={assets.filter_icon} alt="" className=' w-4.5 h-4.5 mr-2 '  />

          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5,  delay: 0.6 }}
         className=' px-6 md:px-16 lg:px-24 xl:px-32 mt-10 ' >
          <p className=' text-gray-500 xl:px-20 max-w-7xl mx-auto ' > showing {filteredCars.length} Cars </p>
          
          <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto ' >
            {
              filteredCars.map((car, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5,  delay: 0.6 }}
                  key={index} >
                    <CarCard car={car} />
                </motion.div>
              ))
            }
          </div>

        </motion.div>

    </div>
  )
}


export default Cars