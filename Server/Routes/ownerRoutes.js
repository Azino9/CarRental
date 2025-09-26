const express = require('express');
const { protect } = require('../Middleware/auth.js');
const { changeRoleToOwner, addCar, getOwnerCars, toggleCarAvailability, deleteCar, getOwnerDashboard, updateUserImage } = require('../Controllers/ownerController.js');
const {upload} = require('../Middleware/multer.js') 

const ownerRouter = express.Router();

ownerRouter.post('/change-role',protect, changeRoleToOwner)
ownerRouter.post('/add-car',upload.single('image'), protect, addCar)
ownerRouter.get('/cars', protect, getOwnerCars)
ownerRouter.post('/toggle-car', protect, toggleCarAvailability)
ownerRouter.post('/delete-car', protect, deleteCar)

ownerRouter.get('/dashboard', protect, getOwnerDashboard);
ownerRouter.post('/update-image', upload.single('image'), protect, updateUserImage);



module.exports = ownerRouter;