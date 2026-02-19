import mongoose, { Schema } from 'mongoose';

const logindata = new Schema({
  role: { type: String, required: true },
  mail: { type: String, required: true },
  password: { type: String, required: true },
  status :{ type : String,required:true}
});

const LoginModel = mongoose.model('LoginModel', logindata);
export default LoginModel;