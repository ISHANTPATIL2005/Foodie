const mongoose = require('mongoose');
require("dotenv").config
const User = require("../models/User")

const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) {
    return res.status(401).json({ success: false, message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user data to request
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};


exports.IsUser = async (req, res, next) => {

    try {
        if (req.user.accountType = !"user") {
            res.status(400).json({
                success: false,
                message: "this route is for User"
            })}
            next()}
    catch { 
        return res.status(500).json({
            success:false,
            message:"Error Occure in IsUser"
        }) }   }


exports.IsRestaurant=async(req,res,next)=>{
    try{
        if(req.user.accountType =!"restaurant"){
            return res.status(400).json({
                success:false,
                message:"This route is only for IsReasturant"
            })
        }
        next();
    }
    catch(error){
return res.status(500).json({
    success:false,
    message:"Error ocuure in IsRestaurant",
    error:error.message
})
    }
}
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This route is protected for Admin"
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User Role is not verified, Please try again",
      error: error.message
    });
  }
};
