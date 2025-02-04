import { getReceiverSocketId, io } from "../config/socket.js"
import Message from "../models/message.js"
import User from "../models/user.js"
import {v2 as cloudinary} from 'cloudinary'


const getAllUser=async(req,res)=>{
try{
const id=req.user._id

const user=await User.find({_id:{$ne:id}}).select('-password')

return res.status(200).json({
    success:true,
    user
})
}
catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}


const getMessage=async(req,res)=>{
try{
const {id}=req.params //receiver id
const userId=req.user._id  //my id 

const message=await Message.find({$or:[
    {senderId:userId,receiverId:id},
    {senderId:id,receiverId:userId}
]})

return res.status(200).json({
    success:true,
    message
})
}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}



const sendMessage=async(req,res)=>{
    try{
        const {text,image}=req.body
const {id}=req.params   //receiverid
const userId=req.user._id   //senderid

let url;
if(image)
{
    const uploadImage=await cloudinary.uploader.upload(image)
    url=uploadImage.secure_url
}

const message=new Message({
    senderId:userId,
    receiverId:id,
    text,
    image:url

})
await message.save()

// todo:real time functionality
const receiverSocketId = getReceiverSocketId(id);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("message", message);
        }

return res.status(200).json({
    success:true,
    message
})
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


export {getAllUser,getMessage,sendMessage}