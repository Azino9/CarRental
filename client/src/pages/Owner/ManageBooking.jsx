import React, { useEffect, useState } from 'react'
import { dummyMyBookingsData } from '../../assets/assets'
import OTitle from '../../Components/Owner/OTitle'

const ManageBooking = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [bookings, setBookings] = useState([])

  // now we create a function that will fetch the owner bookings from the dummy data 
  //  and store it in this booking state above

  const fetchOwnerBookings = async() => {
    // we will get the data from the dummy data 
    setBookings(dummyMyBookingsData)
  }

  useEffect(() => {
    fetchOwnerBookings()
  },[])
  
  return (
<div className=' px-4 pt-10 md:px-10 w-full ' >
      <OTitle title="Manage Booking" subTitle=" Track all customer bookings, approve
      or cancel requests, and manage booking status. " /> 

       <div className=' max-w-3xl w-full rounded-md overflow-hidden border border-border  mt-6 ' >

        <table className=' w-full border-collapse text-left text-sm text-gray-600 ' >
          <thead className=' text-gray-600 ' >
            <tr>
              <th className=' font-medium p-3 ' >Car</th>
              <th className=' font-medium p-3 max-md:hidden ' > Date Range </th> {/*For small screen it will be hidden */}
              <th className=' font-medium p-3 ' >Total</th>
              <th className=' font-medium p-3 max-md:hidden' >Payment</th>
              <th className=' font-medium p-3 ' >Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, idx)=>(
              <tr key={idx} className=' border-t border-border text-gray-500 ' >

                <td className=' p-3 flex items-center gap-3 ' >
                  <img src={booking.car.image} alt="" className=' h-12 w-12 aspect-square rounded-md
                  object-cover ' />
                    <p className=' font-medium max-md:hidden ' >{booking.car.brand} {booking.car.model} </p>                    
                </td>

                <td className=' p-3 max-md:hidden ' > {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]} </td>

                <td className=' p-3 ' > {currency}{booking.price}  /day </td>

                <td className=' p-3 max-md:hidden ' >
                  <span className={` bg-red-100 px-3 py-1 rounded-full text-xs `} >
                    offline
                  </span>
                </td>

                <td className=' p-3 ' >
                  {booking.status === 'pending' ? (
                    <select value={booking.status}  className=' px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none ' >
                      <option value="pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span className={` px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500' } `} >
                      {booking.status}
                    </span>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>

       </div>
    </div>
  )
}

export default ManageBooking