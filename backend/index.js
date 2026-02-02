const express = require("express");
const App = express();
const dotenv = require("dotenv");


const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");


//Routes files
const database = require("./config/Database");
const connectCloudinary=require("./config/cloudinary")
const userRoutes = require("./routes/UserRoutes");
const restaurantRoutes =require("./routes/RestaurantRoute")
const productRoutes =require("./routes/product")
const addressRoutes=require("./routes/AddressRoute")






dotenv.config();
database.connect();
connectCloudinary.connectCloudinary();

//  Middleware
App.use(express.json());
App.use(cookieParser());
App.use(
  cors({
    origin: true, 
    credentials: true,
  })
);
App.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

//  Logging Middleware — placed BEFORE routes
App.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const elapsed = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} => ${res.statusCode} (${elapsed}ms)`
    );
    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      console.log("Request Body:", req.body);
    }
  });
  next();
});






//  Routes
App.use("/api/v1/auth", userRoutes);
App.use("/api/v1/restro",restaurantRoutes)
App.use("/api/v1/product",productRoutes)
App.use("/api/v1/address",addressRoutes)

//  Start server
App.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
