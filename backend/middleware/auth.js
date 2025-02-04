import jwt from 'jsonwebtoken'
import User from '../models/user.js'


export const verifyUser=async(req,res,next)=>{
try{

    const token=req.cookies.jwt

    if(!token)
    {
        return res.status(400).json({
            success:false,
            message:" token not provided"
        })
    }

    const decoded=jwt.verify(token,process.env.SECRET)
    if(!decoded)
    {
        return res.status(400).json({
success:false,
message:"token not matched"
        })
    }

    const user=await User.findById(decoded.id).select('-password')
    if(!user)
    {
        return res.status(404).json({
            success:false,
            message:"user not found"
        })
    }
    req.user=user
    next()

}catch(error)
{
    return res.status(500).json({
        success:false,
        message:error.message
    })
}
}