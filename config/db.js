const mongoose = require("mongoose"); //Import mongoose for MongoDB
require("dotenv").config(); //Load enviroment variables

const connectDB = async () => {
  // Connect to MongoDB
  console.log("Connecting to MongoDB...");
  console.log(process.env.MONGO_URI);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Increase timeout
      connectTimeoutMS: 10000, // Add connection timeout
      socketTimeoutMS: 45000, // Add socket timeout
    });
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
