import mongoose, {  Schema } from 'mongoose';

const user = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  image:{type:String, required:true},
  login_id:{type:mongoose.Schema.Types.ObjectId,ref:"LoginModel"}

});

const UserModel = mongoose.model("UserModel",user)
export default UserModel;
