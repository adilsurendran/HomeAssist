import mongoose from 'mongoose'

mongoose.connect("mongodb://127.0.0.1:27017/HomeAssist").then(()=> console.log("connected to mongodb successfully")
).catch(()=> console.log("failed to make connection with mongodb")
)