import express from 'express'
import { verifyUser } from '../middleware/auth.js'
import { getAllUser, getMessage, sendMessage } from '../controllers/messageController.js'

const messageRouter=express.Router()

messageRouter.get('/users',verifyUser,getAllUser)
messageRouter.get('/:id',verifyUser,getMessage)

messageRouter.post("/send/:id",verifyUser,sendMessage)

 export default messageRouter