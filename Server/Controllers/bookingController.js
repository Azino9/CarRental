const Booking = require('../Models/booking.js');
const Car = require('../Models/car.js');

// Function to check Availability of car for a given date range
const checkAvailability = async (carId, pickupDate, returnDate) => {
    const bookings = await Booking.find({
        car: carId,
        $or: [
            {
                pickupDate: { $lte: returnDate },
                returnDate: { $gte: pickupDate }
            }
        ]
    });
    // length > 0 means car is booked for the given date range
    // And if length is 0 means car is available
    return bookings.length === 0;
};


// API to check availability of cars for the given Date and location
const checkAvailabilityOfCars = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body; 

        
        if (!location || !pickupDate || !returnDate) {
            return res.status(400).json({ message: 'Please provide location, pickupDate, and returnDate' });
        }

        // Fetch all available cars for the given location
        const availableCars = await Car.find({
            location,
            isAvailable: true
        });



        // Check car availability for the given date range using promise
        const availableCarsPromises = availableCars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
            return {...car._doc, isAvailable: isAvailable}
        });

        let AvailableCars = await Promise.all(availableCarsPromises);
        AvailableCars = AvailableCars.filter(car => car.isAvailable === true);

        res.status(201).json({ 
            success: true,
            AvailableCars
         });

    } catch (error) {

        console.error(error);
        res.status(500).json({ 
            success: false,
            message: error.message
         });

    }
};

// API to Create a booking
// API to Create a booking
const createBooking = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId, pickupDate, returnDate } = req.body;

        // Check if the car is available for the selected dates
        const isAvailable = await checkAvailability(carId, pickupDate, returnDate);
        if (!isAvailable) {
            return res.status(400).json({ 
                success: false,
                message: 'Car is not available for the selected dates'
            });
        }

        // If car is available then fetch car data
        const carData = await Car.findById(carId);

        // To calculate price based on pickupDate and returnDate
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = noOfDays * carData.pricePerDay;

        // Save booking
        const newBooking = await Booking.create({
            car: carId,
            user: _id,
            owner: carData.owner,
            pickupDate,
            returnDate,
            price
        });

        res.status(201).json({ 
            success: true,                         // 👈 add success flag
            message: 'Booking created successfully',
            booking: newBooking                     // 👈 send created booking
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            success:false,
            message: error.message
        });
    }
};


// API to list user Booking
const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;

        const bookings =  await Booking.find({ user: _id }).populate('car').sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// API to list owner Bookings
const getOwnerBookings = async (req, res) => {
    try {
        if(req.user.role != 'owner'){
            return res.status(403).json({
                success: false,
                message: 'Access denied. Only owners can access this resource.'
            });
        }
        const bookings = await Booking.find({ owner: req.user._id }).populate('car user').select("-user.password").sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// API to update booking status (only for owner), either he can confirm or cancel the booking
const updateBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body;

        if (!status || (status !== 'confirmed' && status !== 'cancelled')) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Status must be either "confirmed" or "cancelled".'
            });
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found.'
            });
        }

        // if owner is not the one who is trying to update the booking status then return error
        if (booking.owner.toString() !== _id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this booking.'
            });
        }

        // if the owner is same then update the booking status
        booking.status = status;
        await booking.save();

        res.status(200).json({
            success: true,
            message: `Booking ${status} successfully.`,
            booking
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    checkAvailability,
    checkAvailabilityOfCars,
    createBooking,
    getUserBookings,
    getOwnerBookings,
    updateBookingStatus
};