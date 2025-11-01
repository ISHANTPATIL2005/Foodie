const mongoose = require("mongoose")

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },   // fixed typo
  price: { type: Number, required: true },
  image: { type: String, required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent model overwrite on hot-reload in Next.js/Nodemon
const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
