import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const feedback = new Schema({
    
    feedback:{type: String, require: true},
    rating:{type: Number, require: true,default:0},
    rental_id:{type: mongoose.Schema.Types.ObjectId,ref:"RentalModel"},
    shop_id:{type: mongoose.Schema.Types.ObjectId,ref:"ShopModel"},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}
})

const ShopFeedback= mongoose.model("ShopFeedback",feedback)
export default ShopFeedback