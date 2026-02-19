import express from "express";
import { approvebooking, getWorkBookings, getWorker, rejectbooking, UpdateProfile, workerHistory } from "../Controllers/WorkerController.js";



export const router = express.Router()
router.get('/getworker/:id',getWorker)
router.get('/getworkerbookings/:id',getWorkBookings)
router.patch('/changebookingstatus/:id',approvebooking)
router.get('/getworkerhistory/:id',workerHistory)
router.patch('/rejectworkrequest/:id',rejectbooking)
router.put("/updateworker/:id",UpdateProfile)
export default router;