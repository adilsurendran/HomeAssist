import express from "express";
import { getAllData, getallreviewandcomplaints, getAllShops, getAllUsers, getAllWorkers, getShopComplaints, getShopfeedbacks, getWorkerComplaints, getWorkerfeedbacks, givereplyonshop, givereplyonworker, shopStatusUpdate, userStatusUpdate, workerStatusUpdate } from "../Controllers/AdminController.js";


const router = express.Router()
router.get('/getalldata',getAllData)
router.get('/getallusers',getAllUsers)
router.patch('/userstatus/:id',userStatusUpdate)
router.get('/getallshops',getAllShops)
router.patch('/shopstatus/:id',shopStatusUpdate)
router.get('/getallworkers',getAllWorkers)
router.patch('/workerstatus/:id',workerStatusUpdate)
router.get('/getworkerfeedbacks',getWorkerfeedbacks)
router.get('/getshopfeedbacks',getShopfeedbacks)
router.get('/getworkercomplaints',getWorkerComplaints)
router.get('/getshopcomplaints',getShopComplaints)
router.post('/givereplyonworker',givereplyonworker)
router.post('/givereplyonshop',givereplyonshop)
router.get('/getFedandCO',getallreviewandcomplaints)

export default router;