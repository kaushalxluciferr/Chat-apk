
 import bcrypt from 'bcryptjs'
import User from '../models/user.js'
import { generateToken } from '../config/token.js'
import {v2 as cloudinary} from 'cloudinary'
const signup=async(req,res)=>{
    try{
        const {fullName,email,password}=req.body
       

        const isemail=await User.findOne({email})

        if(isemail)
        {
            return res.status(400).json({
                success:false,
                message:"Email already exist"
            })
        }
        if(password.length<6)
        {
            return res.status(400).json({
                success:false,
                message:"password is less than 6 digit"
            })
        }
        
        const hashpas=await bcrypt.hash(password,10);


        const user=new User({
          fullName,
          email,
          password:hashpas  
        })
     await user.save()
        const token=generateToken(user._id,res)

return res.status(200).json({
    success:true,
    token,
    user
})
        
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}
 


const login= async(req,res)=>{
        const {email,password}=req.body
        
    try{
const user=await User.findOne({email})
if(!user)
    {
        return res.status(404).json({
            success:false,
            message:"Something is wrong"
        })
    }
  const match= await bcrypt.compare(password,user.password)  
if(!match)
{
return res.status(400).json({
    success:false,
    message:"password is incorrect"
})
}
const token=generateToken(user._id,res)
return res.status(200).json({
    success:true,
    token,
    user
})
    
    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
    }


const logout=async (req,res)=>{
    try{
        res.cookie("jwt","")
        return res.status(200).json({
            success:true,
            message:"logout successfully"
        })

    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message,
        
        })
       
    }
}

const updateProfile=async (req,res)=>{
    try{
const {profilePic}=req.body
const id=req.user._id

if(!profilePic)
{
    return res.status(400).json({
        success:false,
        message:"profule pic is required"
    })
}

const upload=await cloudinary.uploader.upload(profilePic)

const updateUser=await User.findByIdAndUpdate(id,{profilePic:upload.secure_url},{new:true})

return res.status(200).json({
    success:true,
    updateUser
})

    }catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const checkAuth=async(req,res)=>{
    try{
return res.status(200).json(req.user)        
    }catch(error)
    {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

export {login,logout,signup,updateProfile,checkAuth}