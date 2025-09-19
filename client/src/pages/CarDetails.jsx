import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets';
import Loader from '../Components/Loader';

const CarDetails = () => {
  // To get car id from url 

  const {id} = useParams();
  const navigate = useNavigate();
  const [car,setCar] = useState(null);
  const currency = import.meta.env.VITE_CURRENCY;



  // we have to get car datat and we have it in Assessts file so we will import it here and then we will filter the car which matches the id from the url and then we will set that car to the state variable

  useEffect(() => {

    setCar(dummyCarData.find((car) => car._id === (id)));

  }, [id]);  // Whenever id changes in this url it will excute this function


  return car ? (
    <div className=' px-6 md:px-16 lg:px-24 xl:px-32 mt-16 ' >

      {/* Will add a button using which the user can go to the previous page */}
      <button onClick={() => navigate(-1)} className=' flex items-center gap-2 mb-6 text-gray-500 cursor-pointer ' >
        <img src={assets.arrow_icon} alt="" className=' rotate-180 opacity-65 ' />
        Go Back
      </button>

    <div className=' grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 ' >

      {/* left Car image and details */}
      <div className=' lg:col-span-2 ' >
        <img src={car.image} className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md ' />
        
        <div className=' space-y-6' >

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
              <div key={text} className=' flex flex-col items-center bg-light p-4 rounded-lg ' >
                <img src={icon} alt="" className=' h-5 mb-2 ' />
                 {text} 
              </div>
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
        </div>
      </div>

      {/* Right Booking form */}
      <form></form>

    </div> 
  </div>
  ) : <Loader />
}

export default CarDetails