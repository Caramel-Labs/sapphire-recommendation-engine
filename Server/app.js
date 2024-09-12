const express = require("express");
const connectDB = require("./config/Database");
const cors = require("cors");

const interestRoutes = require("./routes/UserInterestRoutes");

const app = express();

// Connect to the database
connectDB();

// Initialize middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Set up routes
app.use("/api", interestRoutes);

module.exports = app;
