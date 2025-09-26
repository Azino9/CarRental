const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Set up event listeners BEFORE connecting
        mongoose.connection.on('connected', () => {
            console.log("✅ Mongoose connected to DB successfully");
        });

        mongoose.connection.on('error', (err) => {
            console.log("❌ Mongoose connection error:", err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log("⚠️ Mongoose disconnected from DB");
        });

        // Connect to database
        await mongoose.connect(`${process.env.MONGO_URL}/carRental`);
        
    } catch (error) {
        console.log("💥 Error while connecting to the database:", error.message);
        process.exit(1); // Exit the process with failure  
    }
}

module.exports = connectDB;