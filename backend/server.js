/**
 * Javascript Backend Application
 *
 * Acknowledgements:
 * Traversy Media's MERN Stack youtube series
 *
 * Database Users
 * CastleBomber, a@b.com, hack123
 * Draggy, d@b.com, hack123
 * Theo, theo@gg.com, red
 *
 */

const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Serve frontend (development vs production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.use(errorHandler);

app.listen(port, () => console.log(` Server started on port${port}`));
