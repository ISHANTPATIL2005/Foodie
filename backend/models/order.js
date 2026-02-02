const mongoose =require('mongoose')
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          default: 1
        },
        price: {
          type: Number,
          required: true
        }
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
      enum: [
        "PLACED",
        "PREPARING",
        "ASSIGNED",
        "PICKED_UP",
        "ON_THE_WAY",
        "DELIVERED",
        "CANCELLED"
      ],
      default: "PLACED"
    },

    deliveryPartner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    pickupLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },

    currentLocation: {
      lat: { type: Number },
      lng: { type: Number }
    },

    isTrackingEnabled: {
      type: Boolean,
      default: false
    },

    totalPrice: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);




const Order = mongoose.model("Order", orderSchema);

module.exports = Order;