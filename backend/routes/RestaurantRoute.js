const express = require("express");
const router = express.Router();


const {auth,IsUser,isAdmin,IsRestaurant}=require("../middelware/auth")
const{RestaurantRegister,updateRestaurant,deleteRestaurant,getAllRestaurants,getMyRestaurant}=require("../controller/Restaurant");
const {bookRestaurant,getBookingById,getAllBooking,}=require("../controller/Order")

router.post("/register",auth,RestaurantRegister);
router.put("/update",auth,IsRestaurant,updateRestaurant);
router.delete("/delete/:id",auth,IsRestaurant,deleteRestaurant);
router.get("/getAll",getAllRestaurants);
router.get("/getMyRestaurant/:id",getMyRestaurant);

//Booking Routes
router.post("/bookingRestaurant",auth,bookRestaurant)
router.get("/bookingById",auth,getBookingById);
router.get("/allBooking",auth,getAllBooking)

module.exports=router