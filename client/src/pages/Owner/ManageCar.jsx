import React, { useEffect,useState, useCallback } from 'react'
import { assets} from '../../assets/assets'
import OTitle from '../../Components/Owner/OTitle'
import toast from 'react-hot-toast'
import { useAppContext } from '../../hooks/useAppContext'

const ManageCar = () => {

  const {axios, currency, isOwner} = useAppContext();

  const [cars, setCars] = useState([])

  const fetchOwnerCars = useCallback(async() => {
    try {
      console.log('Fetching owner cars...')
      const {data} = await axios.get('/api/owner/cars')
      if(data.success){
        setCars(data.cars)
        console.log('Cars fetched:', data.cars)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Fetch cars error:', error)
      toast.error(error.response?.data?.message || error.message)
    }
  }, [axios])

  const toggleAvailability = async(carId) => {
    try {
      const {data} = await axios.post('/api/owner/toggle-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars() // Refresh the car list to reflect the updated availability
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message) ;
    }
  }

  const deleteCar = async(carId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this car?");
      if(!confirm) return;

      const {data} = await axios.post('/api/owner/delete-car', {carId})
      if(data.success){
        toast.success(data.message)
        fetchOwnerCars() // Refresh the car list
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(error.response?.data?.message || error.message)
    }
  }


  // Fetch owner cars when component loads and when user becomes owner
  useEffect(() => {
    if(isOwner) {
      isOwner && fetchOwnerCars()
    }
  },[isOwner])


  return (
    <div className=' px-4 pt-10 md:px-10 w-full ' >
      <OTitle title="Manage Cars" subTitle="View all listed cars,
       update their details, or remove them from the booking platform." /> 

       <div className=' max-w-3xl w-full rounded-md overflow-hidden border border-border  mt-6 ' >

        <table className=' w-full border-collapse text-left text-sm text-gray-600 ' >
          <thead className=' text-gray-600 ' >
            <tr>
              <th className=' font-medium p-3 ' >Car</th>
              <th className=' font-medium p-3 max-md:hidden ' >Category</th>
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
                  <img onClick={() => toggleAvailability(car._id)} src={ car.isAvailable ? assets.eye_close_icon : assets.eye_icon } alt="" className=' cursor-pointer '  />
                  <img onClick={() => deleteCar(car._id)} src={assets.delete_icon} alt="" className=' cursor-pointer '  />
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