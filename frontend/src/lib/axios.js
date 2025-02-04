import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:"https://chatapp-backend-sandy.vercel.app/api",
    withCredentials:true,
})