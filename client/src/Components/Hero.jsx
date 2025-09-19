import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'

const Hero = () => {
     
    //  So indiee the select option the text we have called please select location , that text should change according to the pickup location seleted in the browser
    // So for that we will use useState hook to manage the state of the selected location
    const [pickupLocation, setPickupLocation] = useState('')
  return (
    <div className=' h-screen flex flex-col items-center justify-center gap-14 bg-light text-center ' >

        <h1 className=' text-4xl md:text-5xl font-semibold ' > Luxury cars on Rent </h1>

        <form className=' flex flex-col md:flex-row  items-start md:items-center 
        justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 
        bg-white shadow-[0px_8px_20px_rgba(0,0,0,0.1)] ' >

            <div className=' flex flex-col md:flex-row items-start md:items-center
            gap-10 min-md:ml-8 ' >

                <div className=' flex flex-col items-start gap-2 ' >

                    <select required value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}  >
                        <option value="">Pickup Location</option>
                        {cityList.map((city)=>(
                            <option value={city} key={city} >{city}</option>
                        ))}
                    </select>

                    {/* to use above pickuplocation useState we are usingg ternary operator here to change state */}
                    <p className=' px-1 text-sm text-gray-500 ' > {pickupLocation ? pickupLocation : " Please select Location " } </p>
                    
                </div>

                <div className=' flex flex-col items-start gap-2 ' >
                    <label htmlFor="Pickup-date"> Pick-up Date </label>
                    <input type="date" id='Pickup-date' min={new Date().toISOString().split('T')[0]} className=' text-sm text-gray-500 ' required />
                </div>

                <div className=' flex flex-col items-start gap-2 ' >
                    <label htmlFor="Return-date">Return Date</label>
                    <input type="date" id='Return-date' className=' text-sm text-gray-500 ' required />
                </div>

            </div>
                <button className=' flex items-center justify-center gap-1 px-9 py-3
                max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer ' >
                    <img src={assets.search_icon} alt="search" className=' brightness-300 ' />
                     Search
                </button>


        </form>

        <img src={assets.main_car} alt="car" className=' max-h-74 ' />

    </div>
  )
}

export default Hero