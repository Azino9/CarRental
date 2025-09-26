import React from 'react'
import Title from './Title'
import { assets} from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import CarCard from './CarCard'
import { useAppContext } from '../hooks/useAppContext'
import { motion } from 'motion/react'

const FeaturedSection = () => {

    const {cars} = useAppContext() ;

    const navigate = useNavigate();
  return (
    <motion.div
    initial={{opacity: 0, y:40}}
    whileInView={{opacity: 1, y:0}}    // When we scroll to this section it will come to its original position
    transition={{duration: 1, ease: "easeInOut"}}
    className=' flex flex-col items-center py-24 px-6 md:px-16
    lg:px-24 xl:px-32 ' >

        <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y:0}}    // When we scroll to this section it will come to its original position
        transition={{duration: 1,delay: 0.5}}>
            <Title title='Featured Vehicles' subTitle=' Explore our selection 
            of premium vehicles for your next adventure.' />
        </motion.div>

        <motion.div
        initial={{opacity: 0, y: 100}}
        whileInView={{opacity: 1, y:0}}    // When we scroll to this section it will come to its original position
        transition={{duration: 1,delay: 0.5}}
         className=' grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 ' >

            {/* Car Card */}
            {
                // it will display all cars in the home screen , so we should set Limit
                cars.slice(0,6).map((car) => (
                     <motion.div key={car._id}
                        initial={{opacity: 0, scale: 0.95}}
                        whileInView={{opacity: 1, scale: 1}}    // When we scroll to this section it will come to its original position
                        transition={{duration: 0.4,ease: "easeOut"}}
                     >
                         <CarCard car={car} />
                     </motion.div>
                ))
            }
        </motion.div>

        {/* this will redirect the users to a page with all the cars so for that we use navigate */}
        <motion.button
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y:0}}    // When we scroll to this section it will come to its original position
        transition={{duration: 0.4, delay: 0.6}}
         onClick={()=>{
            navigate('/cars'); scrollTo(0,0)
        }} className=' flex items-center justify-center gap-2 px-6 py-2 border
        border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer '>
            Explore all cars <img src={assets.arrow_icon} alt="arrow" />
        </motion.button>
    </motion.div>
  )
}

export default FeaturedSection