import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const worker = new Schema({
    
    work_address:{type: String, require: true},
    work_description:{type: String, require: true},
    start_date:{type: Date, require: true},
    end_date:{type: Date, require: true},
    status:{type: String, require: true},
    worker_id:{type: mongoose.Schema.Types.ObjectId,ref:"WorkerModel"},
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:"UserModel"},
     location:{
        lat:{ type:String },
        lng:{ type:String }
    },
})

const WorkerBookingModel= mongoose.model("WorkerBookingModel",worker)
export default WorkerBookingModel