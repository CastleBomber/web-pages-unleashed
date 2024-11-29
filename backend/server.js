/**
 * Javascript Backend Application
 *
 * Acknowledgements:
 * Traversy Media's MERN Stack youtube series
 *
 */

const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
require("dotenv").config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/wallets", require("./routes/walletRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));

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
