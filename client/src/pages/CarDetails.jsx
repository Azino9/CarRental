import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { assets} from '../assets/assets';
import Loader from '../Components/Loader';
import { useAppContext } from '../hooks/useAppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const CarDetails = () => {
  // To get car id from url 

  const {id} = useParams();
  const {cars, axios, currency, pickupDate, setPickupDate, returnDate, setReturnDate} = useAppContext() ;
  const navigate = useNavigate() ;
  const [car,setCar] = useState(null);

  // To handle the form submission
const handleSubmit = async(e) => {
  e.preventDefault();
  try {
    const { data, status } = await axios.post('/api/bookings/create', { carId: id, pickupDate, returnDate });

    if (status === 201 && data.success) {
      navigate('/my-bookings');
      toast.success(data.message);
    } else {
      toast.error(data.message);  // show backend message like "Car is not available"
    }

  } catch (error) {
    // If axios throws, it will have response data for 400 errors
    if (error.response && error.response.data) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
}



  // we have to get car datat and we have it in Assessts file so we will import it here and then we will filter the car which matches the id from the url and then we will set that car to the state variable

  useEffect(() => {

    setCar(cars.find((car) => car._id === (id)));

  }, [cars,id]);  // Whenever id changes in this url it will excute this function


  return car ? (
    <div className=' px-6 md:px-16 lg:px-24 xl:px-32 mt-16 ' >

      {/* Will add a button using which the user can go to the previous page */}
      <button onClick={() => navigate(-1)} className=' flex items-center gap-2 mb-6 text-gray-500 cursor-pointer ' >
        <img src={assets.arrow_icon} alt="" className=' rotate-180 opacity-65 ' />
        Go Back
      </button>

    <div className=' grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 ' >

      {/* left Car image and details */}
      <motion.div
       initial={{ opacity: 0, y: 30 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.5 }}  
       className=' lg:col-span-2 ' >
        <motion.img
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
         src={car.image} className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md ' />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
         className=' space-y-6' >

          <div>
            <h1 className=' text-3xl font-bold ' > {car.brand} {car.model} </h1>
            <p className=' text-gray-500 text-lg ' > {car.category} • {car.year} </p>
          </div>

          <hr className=' border-borderColor my-6 '  />

          <div className=' grid grid-cols-2 sm:grid-cols-4 gap-4 ' >
            {[
              {icon: assets.users_icon, text: `${car.seating_capacity} Seats`},
              {icon: assets.fuel_icon, text: car.fuel_type},
              {icon: assets.car_icon, text: car.transmission},
              {icon: assets.location_icon, text: car.location},
            ].map(({icon, text}) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
               key={text} className=' flex flex-col items-center bg-light p-4 rounded-lg ' >
                <img src={icon} alt="" className=' h-5 mb-2 ' />
                 {text} 
              </motion.div>
            ))}
          </div>

          {/* Description */}
          <div className=' mt-6 ' >
            <h1 className=' text-xl font-medium mb-3 ' > Description </h1>
            <p className=' text-gray-500 ' > {car.description} </p>
          </div>

          {/* Features */}
          <div className=' mt-6 ' >
            <h1 className=' text-xl font-medium mb-3 ' > Features </h1>
            <ul className=' grid grid-cols-1 sm:grid-cols-2 gap-2 ' >
              {
                ["Air Conditioning", "Bluetooth", "Backup Camera", "Cruise Control", "Keyless Entry", "Heated Seats", "USB Port", "Alloy Wheels"].map((item) => (
                  <li key={item} className=' flex items-center gap-2 text-gray-500 ' >
                    <img src={assets.check_icon} alt="" className=' h-4 mr-2 ' />
                    {item}
                  </li>
                ))
                }
            </ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Booking form */}
      <motion.form 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
       onSubmit={handleSubmit}  className=' shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500 ' >
        <p className=' flex items-center justify-between text-2xl text-gray-500 font-semibold ' > {currency} {car.pricePerDay}
           <span className=' text-base text-gray-400 font-normal ' >per day</span> </p>

        <hr className=' border-borderColor my-6' />

        <div className=' flex flex-col gap-2 ' >
          <label htmlFor="pickup-date">Pickup Date</label>
          {/* the min is today's date */}
          <input value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} 
          type="date" id="pickup-date" className=' border border-borderColor px-3 py-2 rounded-lg w-full ' 
          required min={new Date().toISOString().split("T")[0]} /> 

        </div>

        <div className=' flex flex-col gap-2 ' >
          <label htmlFor="return-date">Return Date</label>
          {/* the min is today's date */}
          <input value={returnDate} onChange={(e) => setReturnDate(e.target.value)}
           type="date" id="return-date" className=' border border-borderColor px-3 py-2 rounded-lg w-full '
            required min={new Date().toISOString().split("T")[0]} /> 
        </div>

        <button className= 'w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer' > 
          Book Now
        </button>

        <p className=' text-center text-sm ' > No Credit Card required to reserve </p>
      </motion.form>

    </div> 
  </div>
  ) : <Loader />
}

export default CarDetails