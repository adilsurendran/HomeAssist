import UserModel from "../Models/UserModel.js";
import LoginModel from "../Models/LoginModel.js";
import ShopModel from "../Models/shops/shopModel.js";
import WorkerModel from "../Models/workers/workerModel.js";
import RentalModel from "../Models/shops/shopRentals.js"
import WorkerFeedback from "../Models/workers/WorkerFeedback.js";
import ShopFeedback from "../Models/shops/ShopFeedback.js";
import ShopComplaintModel from "../Models/shops/ShopComplaintModel.js";
import WorkerComplaintModel from "../Models/workers/WorkerComplaintModel.js";



export const getAllData= async (req,res) =>{
    try {
        const mydata= await LoginModel.find()
        // console.log(mydata);
        
        res.status(200).json({myall:mydata})  
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error})  
    }
}
 
export const getAllUsers = async (req,res) => {
try {
    const users= await UserModel.find().populate("login_id")
    // console.log(users); 
    res.status(200).json({user:users})    
} catch (error) {
    console.log(error);  
    res.status(500).json({message:error}) 
}
}

export const userStatusUpdate = async (req,res) =>{
try {
const userlogid = req.params.id
const user= await LoginModel.findById(userlogid)
const newstatus= user.status  == "approved" ? "pending" : "approved"
await LoginModel.findByIdAndUpdate(userlogid,{status:newstatus}) 
res.status(200).json({message:"status updated"})    
} 
catch (error) {
res.status(500).json({message:error})      
}
}

export const getAllShops = async (req,res) => {
try {
    const shops= await ShopModel.find().populate("login_id")
    // console.log(users); 
    res.status(200).json({shop:shops})    
} catch (error) {
    console.log(error);  
}
}

export const shopStatusUpdate = async (req,res) =>{
try {
const shoplogid = req.params.id
const shop= await LoginModel.findById(shoplogid)
const test=await ShopModel.findOne({mail:shop.mail})
const newstatus= shop.status  == "approved" ? "pending" : "approved"
await LoginModel.findByIdAndUpdate(shoplogid,{status:newstatus}) 
await RentalModel.updateMany({shopid:test._id}, {verified:newstatus})
res.status(200).json({message:"status updated"})    
} 
catch (error) {
console.log(error); 
res.status(500).json({message:error})      
}
}

export const getAllWorkers = async (req,res) => {
try {
    const workers= await WorkerModel.find().populate("login_id")
    // console.log(users); 
    res.status(200).json({worker:workers})    
} catch (error) {
    console.log(error);  
}
}

export const workerStatusUpdate = async (req,res) =>{
try {
const workerlogid = req.params.id
const worker= await LoginModel.findById(workerlogid)
const newstatus= worker.status  == "approved" ? "pending" : "approved"
await LoginModel.findByIdAndUpdate(workerlogid,{status:newstatus}) 
res.status(200).json({message:"status updated"})    
} 
catch (error) {
res.status(500).json({message:error})      
}
}

export const getWorkerfeedbacks = async (req,res) =>{
try {
 const feed= await WorkerFeedback.find().populate("user_id").populate("worker_id")
 res.status(200).json({feedback:feed})   
} catch (error) {
res.status(500).json({message:error})  
}
}

export const getShopfeedbacks = async (req,res) =>{
try {
 const feed= await ShopFeedback.find().populate("user_id").populate("shop_id")
 res.status(200).json({feedback:feed})   
} catch (error) {
res.status(500).json({message:error})  
}
}

export const getWorkerComplaints = async (req,res) =>{
try {
 const issue= await WorkerComplaintModel.find().populate("user_id").populate("worker_id")
 res.status(200).json({complaint:issue})   
} catch (error) {
res.status(500).json({message:error})  
}
}

export const getShopComplaints = async (req,res) =>{
try {
 const issue= await ShopComplaintModel.find().populate("user_id").populate("shop_id")
 res.status(200).json({complaint:issue})   
} catch (error) {
res.status(500).json({message:error})  
}
}

export const givereplyonworker = async (req,res) =>{
try {
const {complaint_id,reply} = req.body
 await WorkerComplaintModel.findByIdAndUpdate(complaint_id,{reply:reply,status:"seen"})
 res.status(200).json({message:"reply sent successfully"})   
} catch (error) {
console.log(error);

res.status(500).json({message:error})  
}
}

export const givereplyonshop = async (req,res) =>{
try {
const {complaint_id,reply} = req.body
 await ShopComplaintModel.findByIdAndUpdate(complaint_id,{reply:reply,status:"seen"})
 res.status(200).json({message:"reply sent 200"})   
} catch (error) {
res.status(500).json({message:error})  
}
}

export const getallreviewandcomplaints= async (req,res) =>{
try {
   const shopfeedbacks= await  ShopFeedback.find()
   const sfeedcount= shopfeedbacks.length
   const workfeedbacks= await  WorkerFeedback.find()
   const wfeedcount= workfeedbacks.length
   const totalfeedcount= sfeedcount + wfeedcount

   const shopComplaints= await  ShopComplaintModel.find()
   const scomplaintcount= shopComplaints.length
   const workcomplaints= await  WorkerComplaintModel.find()
   const wcomplaintcount= workcomplaints.length
   const totalcomplaintcount= scomplaintcount + wcomplaintcount  
   console.log(totalfeedcount);
   console.log(totalcomplaintcount);
   res.status(200).json({totalfeedcount,totalcomplaintcount})
   
   
} catch (error) {
  res.status(500).json({message:error})   
}
}