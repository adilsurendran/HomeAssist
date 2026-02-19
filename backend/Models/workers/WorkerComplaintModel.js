import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const complaint = new Schema({
    
    complaint:{type: String, require: true},
    status:{type: String, require: true},
    reply :{type: String},
    worker_id:{type: mongoose.Schema.Types.ObjectId,ref:"WorkerModel"},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}
})

const WorkerComplaintModel= mongoose.model("WorkerComplaintModel",complaint)
export default WorkerComplaintModel