import React from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import CarCard from './CarCard'

const FeaturedSection = () => {

    const navigate = useNavigate();
  return (
    <div className=' flex flex-col items-center py-24 px-6 md:px-16
    lg:px-24 xl:px-32 ' >

        <div>
            <Title title='Featured Vehicles' subTitle=' Explore our selection 
            of premium vehicles for your next adventure.' />
        </div>

        <div className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 ' >

            {/* Car Card */}
            {
                // it will display all cars in the home screen , so we should set Limit
                dummyCarData.slice(0,6).map((car) => (
                     <div key={car._id}>
                         <CarCard car={car} />
                         <div>
                             Available Now
                         </div>
                     </div>
                ))
            }
        </div>

        {/* this will redirect the users to a page with all the cars so for that we use navigate */}
        <button onClick={()=>{
            navigate('/cars'); scrollTo(0,0)
        }} className=' flex items-center justify-center gap-2 px-6 py-2 border
        border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer '>
            Explore all cars <img src={assets.arrow_icon} alt="arrow" />
        </button>
    </div>
  )
}

export default FeaturedSection