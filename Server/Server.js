const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./Config/db');
const userRouter = require('./Routes/userRoutes');
const ownerRouter = require('./Routes/ownerRoutes');
const bookingRouter = require('./Routes/bookingRoutes');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middleware       
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Allow specific origins
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

app.get('/',(req,res) => {
    res.send('API is running....');
})


//api Routes
app.use('/api/user',userRouter)
app.use('/api/owner',ownerRouter)

// Booking routes
app.use('/api/bookings', bookingRouter);

// Start server function
const startServer = async () => {
    try {
        console.log("🚀 Starting server...");
        
        // Database connection first
        await connectDB();
        
        // Start server only after DB connection
        app.listen(PORT, () => {
            console.log(`🎉 Server is running on port http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.log('💥 Failed to start server:', error.message);
        process.exit(1);
    }
}

// Start the server
startServer();