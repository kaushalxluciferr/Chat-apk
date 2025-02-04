import mongoose from "mongoose";

const connectMongo=async()=>{

    mongoose.connection.on("connected",()=>{
        console.log("love you too from db");        
    })
    await mongoose.connect(process.env.MONGODB_URL)
}

export default  connectMongo