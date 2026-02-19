import express from "express";
import upload from "../Middleware/upload.js";
import { approveworkcompleted, bookRental, bookWorker, checkRentalSlot, checkWorkerSlot, displayWorker, getShopComplaints, getUser, getWorkerComplaints, registerShopComplaint, shopFeedbackandRating, userRentalBookings, userWorkerBookings, workerComplaint, workerFeedbackandRating } from "../Controllers/UserController.js";


const router = express.Router()
router.get('/getuser/:id',getUser)
router.post('/bookmyrental', bookRental)
router.get('/getrentalbookings/:id',userRentalBookings)
router.get('/checkrentalslot/:id',checkRentalSlot)
router.get('/checkworkerslot/:id',checkWorkerSlot)
router.get('/showWorkers',displayWorker)
router.post('/bookmyworker', bookWorker)
router.get('/getworkerbookings/:id',userWorkerBookings)
router.patch('/changeuserbookingstatus/:id',approveworkcompleted)
router.post('/workerfeedback',workerFeedbackandRating)
router.post('/registerworkercomplaint',workerComplaint)
router.get('/getworkercomplaints/:id',getWorkerComplaints)
router.get('/getshopcomplaints/:id',getShopComplaints)
router.post('/userfeedbackonshop',shopFeedbackandRating)
router.post('/registershopcompalint',registerShopComplaint)

export default router;