import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const feedback = new Schema({
    
    feedback:{type: String, require: true},
    rating:{type: Number, require: true,default:0},
    worker_id:{type: mongoose.Schema.Types.ObjectId,ref:"WorkerModel"},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"}
})

const WorkerFeedback= mongoose.model("WorkerFeedback",feedback)
export default WorkerFeedback