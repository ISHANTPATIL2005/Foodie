const express = require("express");
const router = express.Router();
const {SignUp,Login}= require("../controller/Auth");
const {auth, IsUser, IsRestaurant} = require("../middelware/auth");


router.post("/signup", SignUp);
router.post("/login", Login);


module.exports=router