const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true } // snapshot of price at order time
    }
  ],

  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true
  },

  paymentMode: {
    type: String,
    enum: ["Cash On Delivery", "UPI"],
    default: "Cash On Delivery"
  },

  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },

  totalPrice: {
    type: Number,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);


