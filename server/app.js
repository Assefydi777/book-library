require("dotenv").config();

const express = require("express");

const app = express();
const port = 5500;

// CORS
const cors = require("cors");

app.use(cors());

// Any request passes through this middleware  to extract json data
app.use(express.json());

// Auth Middleware
const authMiddleWare = require("./middleware/authMiddleware");

// user routes middleware file
const userRoutes = require("./routes/userRoute");

// Books routes
const bookRoutes = require("./routes/bookRoute"); 

// user routes middleware
app.use("/api/users", userRoutes);

// Books routes
app.use("/api/books", authMiddleWare, bookRoutes); 

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Project running on port: ${port}`);
  }
});