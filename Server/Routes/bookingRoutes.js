const express = require('express');
const { createBooking, checkAvailabilityOfCars, updateBookingStatus, getOwnerBookings, getUserBookings } = require('../Controllers/bookingController.js');
const { protect } = require('../Middleware/auth.js');

const bookingRouter = express.Router();


bookingRouter.post('/check-availability', protect, checkAvailabilityOfCars);
bookingRouter.post('/create', protect , createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, updateBookingStatus);

module.exports = bookingRouter;
