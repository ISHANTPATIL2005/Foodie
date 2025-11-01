const mongoose =require("mongoose")

const restaurantSchema = new mongoose.Schema({
     restaurantName:{type:String,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    image:{type:String,required:true},
    phone:{type:Number,required:true},
    product:{type:mongoose.Schema.Types.ObjectId, ref:"MenuItem"},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
})




const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;