import React, { useEffect,useState } from 'react'
import { assets, dummyCarData } from '../../assets/assets'
import OTitle from '../../Components/Owner/OTitle'

const ManageCar = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [cars, setCars] = useState([])

  const fetchOwnerCars = async() => {
    setCars(dummyCarData)
  }


  // Now it will call the fetch Owner car function that will get the data from thre dummy car data assessts.js
  useEffect(() => {
    fetchOwnerCars()
  },[])


  return (
    <div className=' px-4 pt-10 md:px-10 w-full ' >
      <OTitle title="Manage Cars" subTitle="View all listed cars,
       update their details, or remove them from the booking platform." /> 

       <div className=' max-w-3xl w-full rounded-md overflow-hidden border border-border  mt-6 ' >

        <table className=' w-full border-collapse text-left text-sm text-gray-600 ' >
          <thead className=' text-gray-600 ' >
            <tr>
              <th className=' font-medium p-3 ' >Car</th>
              <th className=' font-medium p-3 max-md:hidden ' >Category</th> {/*For small screen it will be hidden */}
              <th className=' font-medium p-3 ' >Price</th>
              <th className=' font-medium p-3 max-md:hidden' >Status</th>
              <th className=' font-medium p-3 ' >Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car, idx)=>(
              <tr key={idx} className=' border-t border-border ' >

                <td className=' p-3 flex items-center gap-3 ' >
                  <img src={car.image} alt="" className=' h-12 w-12 aspect-square rounded-md
                  object-cover ' />
                  <div className=' max-md:hidden ' >
                    <p className=' font-medium ' >{car.brand} {car.model} </p>
                    <p className=' text-xs text-gray-500' >{car.seating_capacity} • {car.transmission} </p>
                  </div>
                </td>

                <td className=' p-3 max-md:hidden ' > {car.category} </td>
                <td className=' p-3 ' > {currency}{car.pricePerDay}  /day </td>

                <td className=' p-3 max-md:hidden ' >
                  <span className={` px-3 py-1 rounded-full ${car.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' } `} >
                    {car.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>

                <td className=' flex items-center p-3 ' >
                  {/* if the car is available then we will show the eye close icon otherwise eye icon */}
                  <img src={ car.isAvailable ? assets.eye_close_icon : assets.eye_icon } alt="" className=' cursor-pointer '  />

                  <img src={assets.delete_icon} alt="" className=' cursor-pointer '  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>

       </div>
    </div>
  )
}

export default ManageCar