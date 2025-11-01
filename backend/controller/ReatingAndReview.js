const mongoose = require("mongoose");
const Product = require("../models/MenuItem");
const RatingAndReview = require("../models/RateingAndReview");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reating, review, productId } = req.body;

    // ✅ Validate inputs
    if (!reating || !review || !productId) {
      return res.status(400).json({
        success: false,
        message: "Fill all the details",
      });
    }

    // ✅ Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // ✅ Check if user already rated this product
    const existingRating = await RatingAndReview.findOne({ user: userId, product: productId });

    let ratingAndReview;

    if (existingRating) {
      // ✅ Update existing rating
      existingRating.reating = reating;
      existingRating.review = review;
      ratingAndReview = await existingRating.save();
    } else {
      // ✅ Create new rating
      ratingAndReview = await RatingAndReview.create({
        reating,
        review,
        user: userId,
        product: productId,
      });
    }

    return res.status(200).json({
      success: true,
      message: existingRating ? "Rating updated successfully" : "Rating created successfully",
      ratingAndReview,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error occurred in createRating",
    });
  }
};




exports.getAllRating = async (req, res) => {
  try {
    const ratings = await RatingAndReview.find()
      .populate("user", "name email")   // show user details
      .populate("product", "name price"); // show product details

    return res.status(200).json({
      success: true,
      message: "All Ratings and Reviews",
      ratings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred in getAllRating",
      error: error.message,
    });
  }
};

exports.getRatingById = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const ratings = await RatingAndReview.find({ product: productId })
      .populate("user", "name email");

    if (!ratings || ratings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No ratings found for this product",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Ratings and Reviews found",
      ratings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred in getRatingById",
      error: error.message,
    });
  }
};
