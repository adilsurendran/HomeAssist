import mongoose from "mongoose";
import { Schema } from "mongoose";

const shop = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  image:{type:String, required:true},
  login_id:{type:mongoose.Schema.Types.ObjectId,ref:"LoginModel"}

});

const ShopModel= mongoose.model("ShopModel",shop)
export default ShopModel