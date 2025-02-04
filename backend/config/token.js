import jwt from 'jsonwebtoken'

export const generateToken=(id,res)=>{
    const token=jwt.sign({id},process.env.SECRET)

    res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV!=='development',
    })
return token;
}