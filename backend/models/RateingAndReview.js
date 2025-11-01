const mongoose=require("mongoose")

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"MenuItem",
        required:true
    },
    reating:{
        type:Number,required:true
    },
    review:{
        type:String,required:true
    }

})
module.exports=mongoose.model("ReatingAndReview",reviewSchema)
