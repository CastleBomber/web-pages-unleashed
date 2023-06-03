/**
 * Javascript Backend Application
 * 
 * Acknowledgements:
 * Traversy Media's MERN Stack youtube series
 * 
 * Database Users
 * CastleBomber, a@b.com, hack123
 *
 */
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
require('dotenv').config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(` Server started on port${port}`));
