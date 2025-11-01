const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String,  required: true, 
   
  },
  password: { 
    type: String,  required: true 
  },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" }
,
  accountType: {
    type: String,enum: ["restaurant", "user", "admin"], default: "user",}
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
