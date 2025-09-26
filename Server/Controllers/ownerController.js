const User = require("../Models/user.js")
const multer = require('multer');
const Car = require("../Models/car.js")
const { imagekit } = require("../Config/imagekit.js")
const fs = require('fs')
const Booking = require("../Models/booking.js");

// API TO CHANGE ROLE TO OWNER
const changeRoleToOwner = async(req,res) => {
    try {

        const {_id} = req.user
        await User.findByIdAndUpdate(_id, { role: 'owner' })
        res.status(200).json({
            success: true,
            message: "Now you can list Cars as an owner"
        })
        
    } catch (error) {
        console.error("Error changing user role:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// API to LIST CARS
const addCar = async(req,res) => {
    try {
        console.log('Add car request received');
        console.log('req.file:', req.file);
        console.log('req.body:', req.body);
        
        const {_id} = req.user
        let car = JSON.parse(req.body.carData)
        const imagefile = req.file;
        
        // Check if file is uploaded
        if (!imagefile) {
            console.log('No file uploaded');
            return res.status(400).json({
                success: false,
                message: "Please upload a car image"
            });
        }
        
        // upload Image to imagekit
        const fileBuffer = fs.readFileSync(imagefile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imagefile.originalname,
            folder: '/cars'
        })
        
        var optimizedImageUrl = imagekit.url({
            path : response.filePath,
            transformation : [
                {"width" : "1280"},  //WIDTH resizing
                {quality : 'auto'}, // Auto compression
                {format : 'webp'}  // COVERT TO MODERN FORMAT
            ]
        });

        const image = optimizedImageUrl;
        await Car.create({...car, owner: _id, image})
        res.status(200).json({
            success : true,
            message : "Car Added"
        })
        
        
    } catch (error) {
        console.log("Error adding car:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

// API to list owner cars
const getOwnerCars = async (req, res) => {
    try {
        const { _id } = req.user;
        const cars = await Car.find({ owner: _id });
        res.status(200).json({
            success: true,
            cars
        });
    } catch (error) {
        console.log("Error fetching owner cars:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// APT to Toggle Car Availability
const toggleCarAvailability = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({
                success: false,
                message: "Car not found"
            });
        }

        // Checking if car belongs to the owner
        if (car.owner.toString() !== _id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to toggle this car's availability"
            });
        }

        car.isAvailable = !car.isAvailable;
        await car.save();
        res.status(200).json({
            success: true,
            message: "Car availability toggled",
            car
        });

    } catch (error) {
        console.log("Error toggling car availability:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// APT to delete a Car
const deleteCar = async (req, res) => {
    try {
        const { _id } = req.user;
        const { carId } = req.body;
        const car = await Car.findById(carId);


        // Checking if car belongs to the owner
        if (car.owner.toString() !== _id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this car"
            });
        }

        // We cannot delete car if it is booked , we will not delete the car, just remove the owner and mark it unavailable


        // Actually delete the car from the database
        await Car.findByIdAndDelete(carId);
        res.status(200).json({
            success: true,
            message: "Car deleted successfully"
        });

    } catch (error) {
        console.log("Error deleting car:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// API to get Dashboard data for owner
const getOwnerDashboard = async (req, res) => {
    try {
        const { _id, role } = req.user;

        if(role !== 'owner'){
            return res.status(403).json({
                success: false,
                message: "Access denied. Only owners can access this dashboard."
            });
        }
        // Fetching owner cars ->  it will add all the cars where the owner is the below id 
        const cars = await Car.find({ owner: _id });

        // Fetching owner bookings
        const bookings = await Booking.find({ owner: _id }).populate('car').sort({ createdAt: -1 });
        
        // Now we will find pending booking and confirmed bookings
        const pendingBookings = await Booking.find({ owner: _id, status: 'pending' });
        const confirmedBookings = await Booking.find({ owner: _id, status: 'confirmed' });

        // Calculate the monthly revenue for this owner
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + booking.price,0 );

        // Where we add all this data for dashboard
        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            confirmedBookings: confirmedBookings.length,
            recentBookings: bookings.slice(0, 4), // Get the 4 most recent bookings
            monthlyRevenue
        };

        res.status(200).json({
            success: true,
            dashboardData
        });

    } catch (error) {
        console.log("Error fetching owner dashboard:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// API to update User Image
const updateUserImage = async (req, res) => {
    try {
        const { _id } = req.user;
        const imagefile = req.file;

        const fileBuffer = fs.readFileSync(req.file.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: req.file.originalname,
            folder: '/cars'
        })
        
        var optimizedImageUrl = imagekit.url({
            path : response.filePath,
            transformation : [
                {"width" : "400"},  //WIDTH resizing
                {quality : 'auto'}, // Auto compression
                {format : 'webp'}  // COVERT TO MODERN FORMAT
            ]
        });

        const image = optimizedImageUrl;

        await User.findByIdAndUpdate(_id, { image });
        return res.status(200).json({
            success: true,
            message: "User image updated successfully",
        });




    } catch (error) {
        console.log("Error updating user image:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = { changeRoleToOwner, addCar, getOwnerCars, toggleCarAvailability, deleteCar, getOwnerDashboard, updateUserImage };