import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import { toast } from 'react-toastify'
import {io} from 'socket.io-client'
const backendUrl='http://localhost:4000'
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigninUp:false,
    isLogin:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,

    checkAuth:async()=>{
        try{
const response=await axiosInstance.get("/auth/check")
set({authUser:response.data})
get().connectSocket()
        }catch(error)
        {
        //    console.log(error)
set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async (data)=>{
        set({isSigninUp:true})
        try{
const response=await axiosInstance.post('/auth/signup',data)
// console.log(response);

set({authUser:response.data})
get().connectSocket()
toast.success("user Created successfully")

        }catch(error)
        {
            toast.error(error.response?.data?.message)
        }finally{
            set({isSigninUp:false})
        }
    }
,
    logout:async ()=>{
      try{
const response=await axiosInstance.post('/auth/logout')
set({authUser:null})
get().disconnectSocket()
toast.success("logout Successfully")
      }catch(error)
      {
        toast.error(error.response?.data?.message)
      }
    },
    
    login:async(data)=>{
        set({isLogin:true})
        try{
            const response=await axiosInstance.post('/auth/login',data)
            set({authUser:response.data})
            toast.success("login successfully")
            get().connectSocket()
        }catch(error)
        {
            toast.error(error?.response?.data.message)
        }
        finally{
            set({isLogin:false})
        }

    },
 
    profileUpdate:async(item)=>{
        set({isUpdatingProfile:true})
        try{
            const response=await axiosInstance.post('/auth/update-profile',item)
            set({authUser:response.data})
            toast.success("updated successfully")
        }catch(error)
        {
            toast.error(error?.response?.data.message)
        }finally{
            set({isUpdatingProfile:false})
        }

    },

    connectSocket:()=>{
      const {authUser} =get()

      if(!authUser||get().socket?.connected) return 

      const socket=io(backendUrl,{
        query:{userId:authUser._id},
      })
      socket.connect()

      set({socket:socket})
      socket.on("getOnlineUsers",(userId)=>{
set({onlineUsers:userId})
      })
    },

    
    disconnectSocket:()=>{
        if(get().socket?.connected)
        {
            get().socket.disconnect()
        }
    }

}))