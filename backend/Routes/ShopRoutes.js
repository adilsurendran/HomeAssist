import express from "express";
import { addRentals, deleteProduct, fetchProduct, getRentals, getShop, getUserRentals, shoprentalbooking, updateBookingStatus, updateProduct } from "../Controllers/ShopController.js";
import upload from '../Middleware/upload.js'


const router = express.Router()

router.get('/getshop/:id',getShop)
router.post('/addrental', upload.single('image'),addRentals)
router.get('/getrentals/:id',getRentals)
router.get('/userlistrentals',getUserRentals)
router.get('/getshoprentalbookings/:id',shoprentalbooking)
router.get('/fetchproduct/:id',fetchProduct)
router.put('/updateproducts',upload.single('image'),updateProduct)
router.delete('/deleteproduct/:id',deleteProduct)
router.put("/updateBookingStatus/:bookingId", updateBookingStatus);

export default router;