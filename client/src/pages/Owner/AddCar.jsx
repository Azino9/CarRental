import React, { useState } from 'react'
import OTitle from '../../Components/Owner/OTitle';
import { assets } from '../../assets/assets';

const AddCar = () => {


  const currency = import.meta.env.VITE_CURRENCY

  const [image,setImage] = useState(null);
  const [car,setCar] = useState({
    brand:'',
    model:'',
    year:0,
    pricePerDay:0,
    category:'',
    transmission:'',
    fuel_type:'',
    seating_capacity:0,
    location:'',
  })

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
  }


  return (
    <div className =' px-4 py-10 md:px-10 flex-1 ' > {/*we used flex1 here because we want it to use entire space after left part */}

       <OTitle title="Add New Car" subTitle="Fill in the details to list a new car for booking, including, availability and car specification." />

       <form onSubmit={onSubmitHandler} className=' flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl ' >

        {/* Car Image */}
        <div className=' flex items-center gap-2 w-full ' >
          <label htmlFor="car-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className=' h-14 rounded cursor-pointer ' />
         
            <input type="file" id='car-image' accept='image/*' hidden onChange={(e) => setImage(e.target.files[0])} /> {/* why we did it hidden so that it wont show and when we click on the image then we get the option to add image */}
             {/* And above we used onChange so that we can actually choose image  */}
          </label>
          <p className=' text-sm text-gray-500 ' >Upload a picture of your Car</p>
        </div>

      {/* Car Brand & Model */}
      <div className=' grid grid-cols-1 md:grid-cols-2 gap-6 ' >

        <div className=' flex flex-col w-full ' >
          <label>Brand</label>
          {/* whenever we enter anuthing here in this input field it will update the branch part above inste the car and setCar */}
          <input type="text"  placeholder=' e.g. Toyota, BMW, Mercedes, Brabus, Monsoory... ' required
          className=' px-3 py-2 mt-1 border border-borderColor rounded-md outline-none  ' value={car.brand} onChange={(e) => setCar({ ...car, brand: e.target.value })} />
        </div>

        <div className=' flex flex-col w-full ' >
          <label>Model</label>
          {/* whenever we enter anuthing here in this input field it will update the model part above inste the car and setCar */}
          <input type="text"  placeholder=' e.g. Corolla, X5, C-Class... ' required
          className=' px-3 py-2 mt-1 border border-borderColor rounded-md outline-none  ' value={car.model} onChange={(e) => setCar({ ...car, model: e.target.value })} />
        </div>

      </div>

      {/*  Car Year, Price, Category */}

      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ' >

        <div className=' flex flex-col w-full ' >
          <label>Year</label>
          <input type="number"  placeholder='2025' required
          className=' px-3 py-2 mt-1 border border-borderColor rounded-md outline-none  ' value={car.year} onChange={(e) => setCar({ ...car, year: e.target.value })} />
        </div>

        <div className=' flex flex-col w-full ' >
          <label> Daily Price ({currency}) </label>
          <input type="number"  placeholder='100' required
          className=' px-3 py-2 mt-1 border border-borderColor rounded-md outline-none  ' value={car.pricePerDay} onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })} />
        </div>

        <div className=' flex flex-col w-full ' >
          <label>Category</label>
          <select value={car.category} onChange={(e) => setCar({ ...car, category: e.target.value })}
           className=' px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' >
            <option value="">Select Category</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>

      </div>

      {/* Car Transmission, Fuel Type, Seating Capacity*/}
      <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ' >
        <div className=' flex flex-col w-full ' >
          
          <label>Transmission</label>
          <select value={car.transmission} onChange={(e) => setCar({ ...car, transmission: e.target.value })}
           className=' px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' >
            <option value="Select Transmission">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div className=' flex flex-col w-full ' >
          <label>Fuel Type</label>
          <select value={car.fuel_type} onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
           className=' px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' >
            <option value="Select Fuel Type">Select Fuel Type</option>
            <option value="Gas">Gas</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
        <div className=' flex flex-col w-full ' >
          <label>Seating Capacity</label>
          <input type="number"  placeholder='5' required
          className=' px-3 py-2 mt-1 border border-borderColor rounded-md outline-none  ' 
          value={car.seating_capacity} onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })} />
        </div>
      </div>


      {/* Car Location */}
      <div className=' flex flex-col w-full max-w-sm ' >
          <label>Location</label>
          <select value={car.location} onChange={(e) => setCar({ ...car, location: e.target.value })}
           className=' px-3 py-2 mt-1 border border-borderColor rounded-md outline-none ' >
            <option value="">Select Location</option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
          </select>
        </div>

        {/* Car description */}
        <div className=' flex flex-col w-full ' >
          <label>Description</label>
          <textarea rows={5} placeholder='Enter car description...' required
          className=' px-3 py-2 mt-1 border border-borderColor rounded-md outline-none  ' 
          value={car.description} onChange={(e) => setCar({ ...car, description: e.target.value })} />
        </div>


        <button className=' flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary
        text-white rounded-md font-medium w-max cursor-pointer ' >
          <img src={assets.tick_icon} alt="" />
          List Your Car
        </button>

       </form>
    </div>
  )
}

export default AddCar