const Address = require("../models/userAddress");

// Add Address
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { house, area, landMark } = req.body;

    if (!house || !area || !landMark) {
      return res.status(400).json({
        success: false,
        message: "Fill all details"
      });
    }

    const address = await Address.create({
      house,
      area,
      landMark,
      user: userId
    });

    return res.status(201).json({
      success: true,
      message: "Address Created Successfully",
      address
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error creating address"
    });
  }
};

// Update Address
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    // Find address belonging to this user
    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found or not authorized"
      });
    }

    // Update fields
    address.house = req.body.house || address.house;
    address.area = req.body.area || address.area;
    address.landMark = req.body.landMark || address.landMark;

    await address.save();

    return res.status(200).json({
      success: true,
      message: "Address Updated Successfully",
      address
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Error updating address"
    });
  }
};

// Get all addresses for user
exports.getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await Address.find({ user: userId });
    return res.status(200).json({
      success: true,
      addresses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


