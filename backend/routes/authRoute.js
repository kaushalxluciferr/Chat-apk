import express from 'express'
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/authController.js'
import { verifyUser } from '../middleware/auth.js'

const authRouter=express.Router()

authRouter.post("/signup",signup)


authRouter.post('/login',login)

authRouter.post('/logout',logout)

authRouter.post('/update-profile',verifyUser,updateProfile)

authRouter.get('/check',verifyUser,checkAuth)
export default authRouter