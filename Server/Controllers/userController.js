const User = require('../Models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Car = require('../Models/car.js');
require('dotenv').config();

// Generate JWT Token
const generateToken = (userId) => {
    const payload = { id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};


// User Registration
const registerUser = async(req,res) => {
    try {
        const {name, email, password} = req.body

        if(!name || !email || !password || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields and ensure password is at least 8 characters long" 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name,email,password: hashedPassword});
        await newUser.save();

        // Generate token and send single response
        const token = generateToken(newUser._id.toString());
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token 
        });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ 
            message: "Internal server error",
            error : error.message 
        });
    }
}


// User Login
const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({ 
                message: "Please provide email and password" 
        });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                 message: "Invalid email or password" 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                 message: "Invalid password" 
            });
        }

        // Generate token
        const token = generateToken(user._id.toString());
        res.status(200).json({
            message: `welcome, ${user.name}!`,
            success: true,
             token 
        });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(400).json({ 
            message: "Credentials are not valid",
            error : error.message 
        });
    }
}


// middleware to get user data from token
const getUserData = async(req,res) => {
    try {
        const user = req.user;
        
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.status(200).json({ 
            success: true,
            user: user
        });
        
    } catch (error) {
        console.error("Error getting user data:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

// To get the cars list for user
const getUserCars = async(req,res) => {
    try {
        const cars = await Car.find({ isAvailable: true });
        return res.status(200).json({
            success: true,
            cars
        });

    } catch (error) {
        console.error("Error getting user cars:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

module.exports = { registerUser, loginUser, getUserData, getUserCars };