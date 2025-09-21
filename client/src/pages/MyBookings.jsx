import React, {useEffect, useState} from 'react'
import Title from '../Components/Title'
import { assets, dummyMyBookingsData } from '../assets/assets';

const MyBookings = () => {

  const [bookings,setBookings] = useState([]);
  const currency = import.meta.env.VITE_CURRENCY

  const fetchMyBookings = async() => {
    setBookings(dummyMyBookingsData)
  }


  // so whenever we load this component this useeffect , it will call this fetchMyBookings function ,
  //  and get the data from the dummyBookingData and store it in the booking state
  useEffect(() => {
    fetchMyBookings()
  },[])
 
  
  return (
    <div className=' px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl ' >

          <Title title="My Bookings" subTitle="View and manage your bookings" align="left" />
        
        <div>
          {bookings.map((booking,index) => (
            <div key={booking.id} className=' grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-border rounded-lg mt-5 first:mt-12 ' >

              {/* Car Details */}
              <div className=' md:col-span-1 '>

                <div className=' rounded-md overflow-hidden mb-3 ' >
                  <img src={booking.car.image} alt={booking.car.title} className='w-full h-auto object-cover aspect-video ' />
                </div>

                <p className=' text-lg font-medium mt-2 ' >{booking.car.brand} {booking.car.model}</p>
                <p className='text-gray-500 ' > {booking.car.year} • {booking.car.category} • {booking.car.location} </p>

              </div>
              {/* Booking Details */}
              <div className=' md:col-span-2 ' >

                <div className=' flex items-center gap-2 ' >
                  <p className=' px-3 py-1.5 bg-light rounded ' > Booking #{index+1} </p>
                  <p className={`px-3 py-1 text-xs rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} >{booking.status}</p>
                </div>

                <div className=' flex items-start gap-2 mt-3' >
                   <img src={assets.calendar_icon_colored} alt="" className='  w-4 h-4 mt-1' />
                  <div>
                    <p className=' text-gray-500 ' >Rental Period</p>
                    <p>{booking.pickupDate.split('T')[0]} To {booking.returnDate.split('T')[0]}</p>
                  </div>
                </div>

                <div className=' flex items-start gap-2 mt-3' >
                   <img src={assets.location_icon_colored} alt="" className='  w-4 h-4 mt-1' />
                  <div>
                    <p className=' text-gray-500 ' >Pick-up Location</p>
                    <p>{booking.car.location}</p>
                  </div>
                </div>
                            
              </div>

              {/* Price */}

              <div className=' md:col-span-1 flex flex-col justify-between gap-6 ' >
                <div className=' text-sm text-gray-500 text-right ' >
                  <p>Total Price</p>
                  <h1 className='text-2xl font-semibold text-primary ' > {currency} {booking.price}</h1>
                  <p>Booked on {booking.createdAt.split('T')[0]}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
    </div>
  )
}

export default MyBookings