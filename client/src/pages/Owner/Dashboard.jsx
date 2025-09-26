import React,{useEffect, useState, useCallback} from 'react'
import { assets} from '../../assets/assets'
import OTitle from '../../Components/Owner/OTitle'
import { useAppContext } from '../../hooks/useAppContext';
import toast from 'react-hot-toast';

const Dashboard = () => {

  const {axios, isOwner, currency} = useAppContext() ;

  const [data,setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  // Create dashboardCards array safely using current data state
  const dashboardCards = [
    {title: "Total Cars", value: data?.totalCars ?? 0 , icon: assets.carIconColored},
    {title: "Total Bookings", value: data?.totalBookings ?? 0 , icon: assets.listIconColored},
    {title: "Pending", value: data?.pendingBookings ?? 0 , icon: assets.cautionIconColored},
    {title: "Confirmed", value: data?.confirmedBookings ?? 0, icon: assets.listIconColored},
  ]

  // Whenever the owner comes to the dashboard we will fetch the data from the backend
  // whenever the component loads this fetchDashboardData function will be called
  const fetchDashboardData = useCallback(async() => {
    try {
      const {data} = await axios.get('/api/owner/dashboard') ;
      if(data.success){
        setData(data.dashboardData) ;
      }else{
        toast.error(data.message) ;
      }
    } catch (error) {
      toast.error(error.message) ;
    }
  }, [axios])

  useEffect(() => {
    if(isOwner){
      fetchDashboardData() ;
    }
    // Remove the below comment to use dummy data

    // fetch data from assessts.js and set it to the data state
    // setData(dummyDashboardData)
    
  },[isOwner])
    
  return (
    <div className=' px-4 pt-10 md:px-10 flex-1 ' >
        <OTitle title="Admin Dashboard" subTitle="Monitor overall platform performance including total cars, bookings, revenue and recent activities." />
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl  ' >
        {dashboardCards.map((card, index) => (
          <div key={index} className=' flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor ' >
           
            <div>
              <h1 className='text-xs text-gray-500'>{card.title}</h1>
              <p className='text-lg font-semibold '>{card.value}</p>
            </div>

            <div className=' flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 ' >
              <img src={card.icon} alt="" className=' h-4 w-4 ' />
            </div>
          </div>
        ))}
        </div>

        <div className=' flex flex-wrap items-start gap-6 mb-8 w-full ' >
          {/* recent booking */}
          <div className=' p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full ' >
            <h1>Recent Bookings</h1>
          <p className=' text-gray-500 ' >Latest customer bookings</p>
          
          {/* to display the recent booking data we will use the above recentBooking we created inside data */}
          {
            data?.recentBookings && data.recentBookings.length > 0 ? (
              data.recentBookings.map((booking, index)=>(
                <div key={index} className=' mt-4 flex items-center justify-between '  >

                  <div className=' flex items-center gap-2 ' >
                    
                    <div className=' hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 ' >
                      <img src={assets.listIconColored} alt="" className=' h-5 w-5 ' />
                    </div>

                    <div>
                       <p> {booking.car.brand} • {booking.car.model} </p>
                       <p className=' text-sm text-gray-500 ' > {booking.createdAt.split('T')[0]} </p>
                    </div>
                  
                  </div>

                  <div className=' flex items-center gap-2 font-medium ' >
                    <p className='  text-sm text-gray-500' > {currency} {booking.price} </p>
                    <p className=' px-3 py-0.5 border border-borderColor rounded-full text-sm ' > {booking.status} </p>
                  </div>

                </div>
              ))
            ) : (
              <div className="mt-4 text-center text-gray-500 py-8">
                <p>No recent bookings to display</p>
              </div>
            )
          }

          </div>

          {/* monthly revenue */}
          <div className=' p-4 md:p-6 border border-borderColor rounded-md w-full md:max-w-xs ' >
            <h1 className=' text-lg font-medium ' >Monthly Revenue</h1>
            <p className=' text-gray-500 ' >Revenue for current month</p>
            <p className=' text-3xl mt-6 font-semibold text-primary ' > {currency}{data?.monthlyRevenue || 0} </p>
          </div>

        </div>
    </div>
  )
}

export default Dashboard