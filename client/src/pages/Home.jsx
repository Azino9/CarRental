import React from 'react'
import Hero from '../Components/Hero'
import CarCard from '../Components/CarCard'
import FeaturedSection from '../Components/FeaturedSection'
import Banner from '../Components/Banner'
import Testimonial from '../Components/Testimonial'
import Newsletter from '../Components/Newsletter'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <>
        <Hero />
        <FeaturedSection /> {/* we have created CarCard then used it in the FeaturedSection part , where we map it , and as Title is used many where like we will use it lots of time so created a separete title over there */}
        <Banner />
        <Testimonial />
        <Newsletter />
    </>
  )
}

export default Home