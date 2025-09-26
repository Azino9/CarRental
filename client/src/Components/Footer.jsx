import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const Footer = () => {
  return (
<motion.div
    initial={{opacity: 0, y: 30}}
    whileInView={{opacity: 1, y:0}}    // When we scroll to this section it will come to its original position
    transition={{duration: 0.6}}
  className=' px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500 '>
            
            <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y:0}}    // When we scroll to this section it will come to its original position
            transition={{duration: 0.6, delay: 0.2}}
             className='flex flex-wrap justify-between items-start gap-8  pb-6 border-borderColor border-b '>
                
                <div className='max-w-80'>
                    <motion.img
                       initial={{opacity: 0}}
                       whileInView={{opacity: 1}}    // When we scroll to this section it will come to its original position
                       transition={{duration: 0.5, delay: 0.3}}
                       src={assets.logo} alt="logo" className=' h-8 md:h-9' />
                    
                    <motion.p 
                       initial={{opacity: 0}}
                       whileInView={{opacity: 1}}    // When we scroll to this section it will come to its original position
                       transition={{duration: 0.5, delay: 0.4}}
                       
                       className=' max-w-80 mt-3 '>
                        Premeium Car Rental Services with a wide selection of luxury and everyday vehicles for all your driving needs.
                    </motion.p>
                    
                    <motion.div
                         initial={{opacity: 0}}
                         whileInView={{opacity: 1}}    // When we scroll to this section it will come to its original position
                         transition={{duration: 0.5, delay: 0.5}}
                        className='flex items-center gap-3 mt-6'>

                        {/* Instagram */}
                        <a href="#"> <img src={assets.instagram_logo} alt=""  className=' w-5 h-5 ' /> </a>
                        {/* Facebook */}
                        <a href="#"> <img src={assets.facebook_logo} alt=""  className=' w-5 h-5 ' /> </a>
                        {/* Twitter */}
                        <a href="#"> <img src={assets.twitter_logo} alt=""  className=' w-5 h-5 ' /> </a>
                        {/* LinkedIn */}
                        <a href="#"> <img src={assets.gmail_logo} alt=""  className=' w-5 h-5 ' /> </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y:0}}    // When we scroll to this section it will come to its original position
                    transition={{duration: 0.6, delay: 0.4}}
                    className=' flex flex-wrap justify-between w-1/2 gap-8 ' >

                       <div>
                           <h2 className='text-base font-medium uppercase text-gray-800'>COMPANY</h2>
                           <ul className='mt-3 flex flex-col gap-2 text-sm'>
                               <li><a href="#">Home</a></li>
                               <li><a href="#">Browse Cars</a></li>
                               <li><a href="#">List Your Cars</a></li>
                               <li><a href="#">About Us</a></li>
                           </ul>
                       </div>
                       <div>
                           <h2 className='text-base font-medium uppercase text-gray-800'>Resources</h2>
                           <ul className='mt-3 flex flex-col gap-2 text-sm'>
                               <li><a href="#">Help Center</a></li>
                               <li><a href="#">Terms of Services</a></li>
                               <li><a href="#">Privacy Policy</a></li>
                               <li><a href="#">Insurance</a></li>
                           </ul>
                       </div>
                       <div>
                           <h2 className='text-base font-medium uppercase text-gray-800'>Contact</h2>
                           <ul className='mt-3 flex flex-col gap-2 text-sm'>
                               <li><a href="#">1234 Luxury Drive</a></li>
                               <li><a href="#">San Fransisco, CA 94107</a></li>
                               <li><a href="#">+1 234567890</a></li>
                               <li><a href="#">CarRental@hopIn.community</a></li>
                           </ul>
                       </div>
                </motion.div>

            </motion.div>

            <motion.div
            initial={{opacity: 0, y: 10}}
            whileInView={{opacity: 1, y:0}}    // When we scroll to this section it will come to its original position
            transition={{duration: 0.6, delay: 0.6}}
               className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} <a href="https://prebuiltui.com">PrebuiltUI</a>. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                     <li> |</li> 
                    <li><a href="#">Terms</a></li>
                    <li> |</li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </motion.div>
        </motion.div>
  )
}

export default Footer