import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";


export const useChatStore=create((set,get)=>({

     messages:[],
     users:[],
     selectedUser:null,
     isUserLoading:false,
     isMessageLoading:false,



     getUsers:async()=>{
        set({isUserLoading:true})
        try{
            const response=await axiosInstance.get('/api/message/users')
            set({users:response.data.user})
        }catch(error)
        {
            toast.error(error?.response?.data.message)
        }finally{
            set({isUserLoading:false})
        }
     },


     getMessages:async(id)=>{
        set({isUserLoading:true})
        try{
            const response=await axiosInstance.get(`/api/message/${id}`)
            set({messages:response.data.message})
        }catch(error)
        {
            toast.error(error?.response?.data.message)
        }finally{
            set({isUserLoading:false})
        }

     },

     setSelectedUser:async(selectedUser)=>
     {
         set({selectedUser})
     },


     sendMessage:async(data)=>{
     const {selectedUser,message}=get()   //selected user from up is not here so we are using get to import 
     try{
const response=await axiosInstance.post(`/api/message/send/${selectedUser._id}`,data)
set({message:[...message,response.data]})
     }catch(error)
     {
toast.error(error?.response?.data.message)
     }
     },

     subsribeToMessages:()=>{
        const {selectedUser} =get()
        if(!selectedUser)
            {
                return ;
            }
            const Socket=useAuthStore.getState().socket

        Socket.on("message",(message)=>{
if(message.senderId!=selectedUser._id) return 

set({messages:[...get().messages,message]})
        })
     },


     unSubscribeMessage:()=>{
   const socket=useAuthStore.getState().socket
   socket.off("message")
     }
}))