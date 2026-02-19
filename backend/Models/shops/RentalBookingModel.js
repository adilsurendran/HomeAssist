import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const rental = new Schema({

    work_address:{type: String, require: true},
    rent_amount:{type: Number, require: true},
    rent_duration:{type: String, require: true},
    start_date:{type: Date, require: true},
    end_date:{type: Date, require: true},
    status:{type: String, require: true},
    payment:{ type: String,default: "pending" },
    rental_id:{type: mongoose.Schema.Types.ObjectId,ref:"RentalModel"},
    shop_id:{type:mongoose.Schema.Types.ObjectId,ref:"ShopModel"},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"},
    location:{
        lat:{ type:String },
        lng:{ type:String }
    },
})

const RentalBookingModel= mongoose.model("RentalBookingModel",rental)
export default RentalBookingModel