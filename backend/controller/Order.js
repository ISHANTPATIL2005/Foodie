const mongoose = require("mongoose");
const User = require("../models/User");
const Product = require("../models/MenuItem");
const Address = require("../models/userAddress");
const Order = require("../models/order");
const Booking = require("../models/RestaurantBooking")
const Restaurant=require("../models/Restaurant")

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, paymentMode, address } = req.body;

    // 1️⃣ Validate request
    if (!items || items.length === 0 || !address || !paymentMode) {
      return res.status(400).json({
        success: false,
        message: "Fill all details OR item not selected"
      });
    }

    // 🔍 DEBUG: Log userId and address lookup
    console.log("DEBUG - userId:", userId);
    console.log("DEBUG - address ID:", address);

    // 2️⃣ Check if address exists (removed user check for testing)
    const userAddress = await Address.findById(address);

    console.log("DEBUG - userAddress found:", userAddress);

    if (!userAddress) {
      return res.status(404).json({
        success: false,
        message: "Address not found"
      });
    }

    let totalPrice = 0;
    const orderItems = [];
    let restaurant = null;

    // 3️⃣ Loop through items and calculate total
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const product = await Product.findById(item.product).populate("restaurant");
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.product}`
        });
      }

      if (i === 0) {
        if (!product.restaurant) {
          return res.status(404).json({
            success: false,
            message: "Restaurant not found for product"
          });
        }
        restaurant = product.restaurant;
      }

      totalPrice += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    if (!restaurant || !restaurant.latitude || !restaurant.longitude) {
      return res.status(400).json({
        success: false,
        message: "Restaurant location not available"
      });
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      address: userAddress._id,
      paymentMode,
      totalPrice,
      status: "PLACED",
      pickupLocation: {
        lat: restaurant.latitude,
        lng: restaurant.longitude
      },
      isTrackingEnabled: false
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });

  } catch (error) {
    console.error("Error creating order:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message
    });
  }
};


exports.assignDeliveryPartner = async (req, res) => {
  try {
    const { orderId, deliveryPartnerId } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        deliveryPartner: deliveryPartnerId,
        status: "ASSIGNED",
        isTrackingEnabled: true
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    return res.json({
      success: true,
      message: "Delivery partner assigned",
      order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to assign delivery partner",
      error: error.message
    });
  }
};



exports.getUserOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price") // populate product details
      .populate("address")                     // populate address details
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting user orders",
      error: error.message
    });
  }
};



exports.getAllOrder = async (req, res) => {
  try {
    const order = await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price")
      .populate("address")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      message: "All order found",
      order
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error Get in getAllOrder",

    })
  }
}


exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message
    });
  }
};


//restaurant Booking



exports.bookRestaurant = async (req, res) => {
  try {
    const userId = req.user?.id;  // Optional chaining for safety
    const { restaurantId, time, phone, paymentMode } = req.body;

    // 1️⃣ Validate all required inputs
    if (!restaurantId || !phone || !time) {
      return res.status(400).json({
        success: false,
        message: "Fill all the details",
      });
    }

   
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found.",
      });
    }

    // 3️⃣ Create a booking
    const booking = await Booking.create({
      restaurant: restaurantId,
      user: userId,
      phone,
      time,
      paymentMode: paymentMode || "Cash On Delivery", // optional fallback
    });

    // 4️⃣ Respond success
    return res.status(201).json({
      success: true,
      message: "Booking confirmed successfully!",
      booking,
    });

  } catch (error) {
    console.error(" Error in bookRestaurant:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while booking the restaurant",
      error: error.message,
    });
  }
};


exports.getBookingById=async(req,res)=>{
  try{
    const {restaurantId}=req.body
    if(!restaurantId){
      return res.json({
        success:false,
        message:"Restaurant not found"
      })
    }
    const booking=await Booking.findOne(restaurantId)
    .populate("restaurant","name , address")

    if(!booking){
       return res.json({
        success:false,
        message:"Boooking  not found"
      })}

      return res.status(200).json({
        success:true,
        message:"booking found",
        booking
      })
  }
 
    catch (error) {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Something went wrong while booking the restaurant",
    error: error.message,
  });
}
  
}

exports.getAllBooking=async(req,res)=>{
  try{
    const booking =await Booking.find()
    return res.status(200).json({
      success:true,
      message:"Finding All Booking",
      booking
    })
  }
  catch (error) {
  console.error(error);
  return res.status(500).json({
    success: false,
    message: "Something went wrong while finding booking By Id  the restaurant",
    error: error.message,
  });
}
}