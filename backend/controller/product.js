const Restaurant = require("../models/Restaurant");
const MenuItem = require("../models/MenuItem");
const User = require("../models/User");
const mongoose = require("mongoose");
const {imageUploder} = require("../utils/imageUploder");



exports.createproduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, description, category, price } = req.body;

    // 1️⃣ Validate inputs
    if (!name || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Fill all the details"
      });
    }

    // 2️⃣ Image check
    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "Image not received"
      });
    }

    const image = req.files.image;

    // 3️⃣ Upload image
    const imageUpload = await imageUploder(
      image,
      `${process.env.CLOUDINARY_FOLDER}/products`
    );

    if (!imageUpload) {
      return res.status(400).json({
        success: false,
        message: "Image upload failed"
      });
    }

    // 4️⃣ Find restaurant owned by user
    const restaurant = await Restaurant.findOne({ owner: userId });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found for this user"
      });
    }

    // 5️⃣ Create product (FIXED)
    const product = await MenuItem.create({
      name,
      description,
      category,
      price,
      image: imageUpload.secure_url,

      // ✅ IMPORTANT FIX
      restaurant: restaurant._id
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {
    console.error("createproduct error:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred in createproduct",
      error: error.message
    });
  }
};



exports.getAllProduct = async (req, res) => {
  try {
    const filter = {};

    // Optional: filter by category
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Optional: filter by restaurant
    if (req.query.restaurant) {
      filter.restaurant = req.query.restaurant;
    }

    const allProduct = await MenuItem.find(filter)
      .populate("restaurant", "username email") // get restaurant info
      .exec();

    return res.status(200).json({
      success: true,
      products: allProduct
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await MenuItem.findById(productId)
      .populate("restaurant", "username email") 
      .exec();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getProductByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Check if restaurant ID is valid
    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "Invalid restaurant ID",
      });
    }

    // Fetch all products for this restaurant
    const products = await MenuItem.find({ restaurant: restaurantId })
      .populate("restaurant", "username email") // optional: include restaurant info
      .exec();

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found for this restaurant",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching products by restaurant",
      error: error.message,
    });
  }
};


exports.searchProduct=async(req,res)=>{
  try{
    const {query}=req.query
    if(!query||query.trim()===""){
      const products=await MenuItem.find()
      return res.json({success:true,products})
    }

    const products=await MenuItem.find({
      $or:[
              { name: { $regex: query, $options: "i" } },      
        { category: { $regex: query, $options: "i" } },
      ]
    })
return res.status(200).json({
  success:true,
  message:"Product Found",
  products
})




  }
  catch(error){
    return res.status(500).josn({
      success:false,
      message:"Product ot Found for this Product",
      error:error.message
    })
  }
}
