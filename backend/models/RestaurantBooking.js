const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  paymentMode: {
    type: String,
    enum: ["Cash", "Online"],
    default: "Cash ",
  },
}, { timestamps: true });

module.exports = mongoose.model("RestaurantBooking", bookingSchema);
