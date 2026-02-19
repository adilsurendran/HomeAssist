import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const complaint = new Schema({
    
    complaint:{type: String, require: true},
    status:{type: String, require: true},
    reply:{type:String},
    shop_id:{type: mongoose.Schema.Types.ObjectId,ref:"ShopModel"},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}
})

const ShopComplaintModel= mongoose.model("ShopComplaintModel",complaint)
export default ShopComplaintModel