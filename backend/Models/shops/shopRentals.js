import mongoose from "mongoose";
import { Schema } from "mongoose";

const productdata= new Schema({
    name: { type:String, required:true},
    price:{ type:Number, required:true},
    category: { type:String, required:true},
    verified : { type:String, required:true},
    availability: {type: String , required: true},
    image: { type:String, required:true},
    description: { type:String, required:true},
    shopid:{type:mongoose.Schema.Types.ObjectId,ref:'ShopModel'},
    
  averageRating: {
    type: Number,
    default: 0,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
})

const RentalModel= mongoose.model('RentalModel',productdata)
export default RentalModel