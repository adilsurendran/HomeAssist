import multer from 'multer';
import cors from 'cors'
import express from "express";
import './Config/db.js'
import AuthRoutes from './Routes/AuthRoutes.js'
import UserRoutes from  './Routes/UserRoutes.js'
import AdminRoutes from  './Routes/AdminRoutes.js'
import ShopRoutes from  './Routes/ShopRoutes.js'
import WorkerRoutes from  './Routes/WorkerRoutes.js'


const app = express()
app.use(express.json())
app.use(cors({origin:"*"}))
app.use('/uploads', express.static('uploads'));


app.use('/api/auth',AuthRoutes)
app.use('/api/admin',AdminRoutes)
app.use('/api/user',UserRoutes)
app.use('/api/shop',ShopRoutes)
app.use('/api/worker',WorkerRoutes)

app.listen(5000,()=>{
    console.log(`server running on http://localhost:5000`)  
})