const mongoose=require("mongoose")
const User=require("../models/userAddress")
const Cart=require("../models/Cart")
const MenuItem = require("../models/MenuItem");

// Get cart for logged-in user
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(200).json({ success: true, items: [], message: "Cart is empty" });
    }

    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity: quantity || 1 }]
      });
    } else {
      // Check if product already exists in cart
      const index = cart.items.findIndex(item => item.product.toString() === productId);

      if (index > -1) {
        // Product exists → update quantity
        cart.items[index].quantity += quantity || 1;
      } else {
        // Product does not exist → add new
        cart.items.push({ product: productId, quantity: quantity || 1 });
      }
      await cart.save();
    }

    cart = await cart.populate("items.product");
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Update quantity of a product in cart
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({ success: false, message: "Product ID and quantity are required" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    const index = cart.items.findIndex(item => item.product.toString() === productId);
    if (index === -1) return res.status(404).json({ success: false, message: "Product not found in cart" });

    cart.items[index].quantity = quantity;
    await cart.save();

    await cart.populate("items.product");
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Remove a product from cart
exports.removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) return res.status(400).json({ success: false, message: "Product ID is required" });

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    await cart.populate("items.product");
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = [];
    await cart.save();
    return res.status(200).json({ success: true, message: "Cart cleared", cart });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
