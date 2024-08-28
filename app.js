const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Initialize packages
const app = express();

// Access the .env file
dotenv.config();

// Initialize Constants
const PORT = process.env.PORT || 5001;
console.log(`Server is running on ${PORT}`)

// MongoDB connection function
const connectMongoDB = async () => {
    try {
        const connectDB = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected: ${connectDB.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure code
    }
};

// Define routes
app.get("/", (req, res) => {
    res.status(200).send("Welcome to the Server");
});

// Main function to start the server
const startServer = async () => {
    await connectMongoDB(); // Wait for MongoDB connection
    app.listen(PORT, () => {
        console.log(`Listening to requests on port ${PORT}`);
    });
};

// Start the server
startServer();
