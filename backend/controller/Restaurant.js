const mongoose = require("mongoose")
const Restaurant = require("../models/Restaurant");
const { imageUploder } = require("../utils/imageUploder");
const User = require("../models/User");
const Product = require("../models/MenuItem");




exports.RestaurantRegister = async (req, res) => {
  try {
    const userId = req.user.id;
    const { restaurantName, address, city, phone, latitude, longitude } = req.body;


    // Check required fields
    if (!restaurantName || !address || !city || !phone || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Fill all the details including location"
      });
    }


    // Check if restaurant already exists for this user
    const existingRestaurant = await Restaurant.findOne({ owner: userId });

    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: "Restaurant already registered",
      });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "Image not received",
      });
    }

    const image = req.files.image;

    // Upload to Cloudinary (folder path can be nested)
    const imageUpload = await imageUploder(
      image,
      `${process.env.CLOUDINARY_FOLDER}/products`
    );

    if (!imageUpload) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed",
      });
    }

    // Create new restaurant entry
   const newRestaurant = await Restaurant.create({
  restaurantName,
  address,
  city,
  phone,
  owner: userId,
  image: imageUpload.secure_url,
  latitude,
  longitude
});


    // Update user role
    await User.findByIdAndUpdate(
      userId,
      { accountType: "restaurant" },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant: newRestaurant,
    });

  } catch (error) {
    console.error("RestaurantRegister error:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred in Restaurant Register",
      error: error.message,
    });
  }
};


// Update restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const userId = req.user.id;

    const restaurant = await Restaurant.findOneAndUpdate(
      { owner: userId },       // filter
      req.body,                // update fields
      { new: true, runValidators: true } // options
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred in updateRestaurant",
      error: error.message,
    });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const userId = req.user.id;

    const restaurant = await Restaurant.findOneAndDelete({ owner: userId });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Downgrade user back to "user"
    await User.findByIdAndUpdate(userId, { accountType: "user" }, { new: true });

    return res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred in deleteRestaurant",
      error: error.message,
    });
  }
};


exports.getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ success: false, message: "No restaurant found" });
    }

    // 🔗 Find all products created by this restaurant
    const products = await Product.find({ restaurant: restaurant._id });

    return res.status(200).json({
      success: true,
      restaurant,
      products,   // send products here
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json({ success: true, restaurants });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
