import express from "express";
import upload from "../Middleware/upload.js";
import { checklogin, registerShop, registerUser, registerWorker } from "../Controllers/AuthController.js";

const router = express.Router()

router.post('/registeruser',upload.single("photo"),registerUser)
router.post('/registershop',upload.single("photo"),registerShop)
router.post('/registerworker',upload.single("photo"),registerWorker)
router.post('/checklogin',checklogin)

export default router;