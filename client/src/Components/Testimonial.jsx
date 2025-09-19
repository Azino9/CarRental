import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';

const Testimonial = () => {
        const testimonials = [
        { id: 1, name: "Gal Gadot",
          Location: "Barcelona, Spain",
          image: assets.testimonial_image_1,
          rating: 5,
          testinomial: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!"
         },
        { id: 2, name: "Dawyn Johnson",
          Location: "New York, USA",
          image: assets.testimonial_image_2,
          rating: 4,
          testinomial: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" 
        },
        { id: 3, name: "Sophia Lee",
            Location: "Seoul, South Korea",
            image: assets.testimonial_image_1,
            rating: 5,
            testinomial: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." 
        },
        { id: 4, name: "John Wick",
            Location: "New York, USA",
            image: assets.testimonial_image_2,
            rating: 4,
            testinomial: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" 
        },
        { id: 5, name: "Tsunade ",
            Location: "Konoha, Japan",
            image: assets.testimonial_image_1,
            rating: 5,
            testinomial: "Fantastic experience! From start to finish, the team was professional, responsive, and genuinely cared about delivering great results." 
        },
        { id: 6, name: "Iron Man",
            Location: "New York, USA",
            image: assets.testimonial_image_2,
            rating: 4,
            testinomial: "I’m truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" 
        },
    ];

  return (
    <div className=" py-28 px-6 md:px-16 lg:px-24 xl:px-44 ">
        {/* We import our own Titlecomponent which we created */}
        <Title title="What Our Customers Say" subTitle="Discover why discerning travelers chooseCarRental for Luxury Cars." />

            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18 ">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500 ">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.Location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light ">"{testimonial.testinomial}"</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Testimonial