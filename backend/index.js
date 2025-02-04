import express from 'express'
import { configDotenv } from 'dotenv'
import authRouter from './routes/authRoute.js'
import connectMongo from './config/db.js'
import cookieParser from 'cookie-parser'
import { connectCloudinary } from './config/cloudinary.js'
import messageRouter from './routes/messageRoute.js'
import cors from 'cors'
import { app, server } from './config/socket.js'

configDotenv()


await connectMongo()
await connectCloudinary()


// middleware
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin
    credentials: true
}));

// route
app.use('/api/auth',authRouter)
app.use("/api/message",messageRouter)

server.listen(process.env.PORT,()=>{
    console.log("love you from server");
    
})