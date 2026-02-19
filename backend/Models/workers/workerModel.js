import mongoose, {  Schema } from 'mongoose';

const worker = new Schema({
  name: { type: String, required: true },
  mail: { type: String, required: true },
  number: { type: String, required: true },
  address: { type: String, required: true },
  expertise : { type: String, required: true },
  workinghours : { type: String, required: true },
  fee : { type: Number, required: true },
 averageRating: {
  type: Number,
  default: 0
},
totalRatings: {
  type: Number,
  default: 0
},
category:{type:[String],default:null},
  image:{type:String, required:true},
  login_id:{type:mongoose.Schema.Types.ObjectId,ref:"LoginModel"}

});

const WorkerModel = mongoose.model('WorkerModel', worker);
export default WorkerModel;
