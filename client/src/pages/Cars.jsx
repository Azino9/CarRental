import React ,{useState} from 'react'
import Title from '../Components/Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from '../Components/CarCard';

const Cars = () => {


  // For the search input so that we can toggle the value
  const [input, setInput] = useState("");

  return (
    <div>
        <div className=' flex flex-col items-center py-20 bg-light max-md:px-4  ' >
          <Title title='Available Cars' subTitle=' Discover our extensive range of vehicles available for rent.' />

          <div className=' flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow ' >

          <img src={assets.search_icon} alt="" className=' w-4.5 h-4.5 mr-2 '  />

          <input onClick={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Search by car name, model, or location' className=' w-full h-full outline-none text-gray-500 ' />

          <img src={assets.filter_icon} alt="" className=' w-4.5 h-4.5 mr-2 '  />

          </div>
        </div>

        <div className=' px-6 md:px-16 lg:px-24 xl:px-32 mt-16 mb-32 ' >
          <p> showing {dummyCarData.length} Cars </p>
          <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto ' >
            {
              dummyCarData.map((car, index) => (
                <div key={index} >
                  <CarCard car={car} />
                </div>
              ))
            }
          </div>

        </div>

    </div>
  )
}


export default Cars