 import {Server} from 'socket.io'
 import http from 'http'
 import express from 'express'

 const app=express()

 const server=http.createServer(app)

 const io=new  Server(server,{

     cors:{
         origin:["http://localhost:5173"],
        }
    })

export function getReceiverSocketId(userId){
return userSocket[userId]
}




// used to store online users

const userSocket={}    //store {userId:socketId}

io.on("connection",(socket)=>{
    console.log("connected",socket.id);

const userId=socket.handshake.query.userId
if(userId)
{
    userSocket[userId]=socket.id
}

io.emit("getOnlineUsers",Object.keys(userSocket))

    socket.on("disconnect",()=>{
        console.log("disconnected",socket.id);

        delete userSocket[userId]
        io.emit("getOnlineUsers",Object.keys(userSocket))
    })
    
})



    export {io,server,app}