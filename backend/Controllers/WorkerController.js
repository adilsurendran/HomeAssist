import WorkerModel from "../Models/workers/workerModel.js"
import WorkerBookingModel from "../Models/workers/workerBookingModel.js"
import WorkerFeedback from "../Models/workers/WorkerFeedback.js"



export const getWorker =async (req,res)=>{
    try {
    const workerid= req.params.id
    const worker = await WorkerModel.findById(workerid)
    res.status(200).json(worker)
    } catch (error) {
        res.status(500).json({message:error})
        console.log(error);   
    }
}

export const getWorkBookings= async (req,res) => {
    try {
        const wid= req.params.id
        const Bookings= await WorkerBookingModel.find({worker_id:wid}).populate("user_id")
        res.status(200).json({bookings:Bookings})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }
}

export const approvebooking= async (req,res) => {
    try {
        const bid= req.params.id
        await WorkerBookingModel.findByIdAndUpdate(bid,{status:"approved"})  
         res.status(200).json({message:"status updated"}) 
    } catch (error) {
         console.log(error);
        res.status(500).json({message:error})       
    }
}

export const rejectbooking= async (req,res) => {
    try {
        const bid= req.params.id
        await WorkerBookingModel.findByIdAndUpdate(bid,{status:"rejected"})  
         res.status(200).json({message:"booking rejected"}) 
    } catch (error) {
         console.log(error);
        res.status(500).json({message:error})       
    }
}

export const  workerHistory = async (req,res) => {
    try {
        const wid= req.params.id
        const Hystory= await WorkerFeedback.find({worker_id:wid}).populate("user_id")
        res.status(200).json({history:Hystory})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})
    }    
}
export const UpdateProfile= async (req, res) => {
  try {
    const updatedWorker = await WorkerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedWorker)
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: error.message })
  }
}
