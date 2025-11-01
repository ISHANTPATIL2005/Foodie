const mongoose =require("mongoose")
const Restaurant = require("./Restaurant")

const categorySchema = new mongoose.Schema({
     categoryName:{type:String,required:true},
     Restaurant:{type:mongoose.Schema.Types.ObjectId,ref:'Restaurant'},
    
    createdAt: { type: Date, default: Date.now }
})

const Category = mongoose.model("Category", categorySchema);

module.exports = User;
