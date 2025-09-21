import React, { useState } from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes,useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import MyBookings from './pages/MyBookings';
import Footer from './Components/Footer';
import Dashboard from './pages/Owner/Dashboard';
import Layout from './pages/Owner/Layout';
import AddCar from './pages/Owner/AddCar';
import ManageCar from './pages/Owner/ManageCar';
import ManageBooking from './pages/Owner/ManageBooking';

const App = () => {

  {/* in the Navbar here we should pass the props as we are destructureing the props in the Navbar -> setShowLogin so we have to pass it here */}
  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner');
  return (
    <>

    {/* this Navbar wew have mounted here at the top so that we want this in every page , but we need to hide it whenever it is in the owners dashboard so for that
    -> we will identify the path and according to that we will hide the Navbar */}
      { !isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/cars' element={<Cars />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        
        {/* Owner Dashboard routes */}
        <Route path='/owner' element={<Layout />} >
          <Route index element={<Dashboard />} />
          <Route path='add-car' element={<AddCar />} />
          <Route path='manage-cars' element={<ManageCar />} />
          <Route path='manage-bookings' element={<ManageBooking />} />
        </Route>
      </Routes>

      {/* we have to mount the footer in all the pages so we are mounting it outside the all, but we have to hide it in the admin dashboard */}
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App