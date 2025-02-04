import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Camera, Mail, User } from 'lucide-react'

function Profile() {

  const {authUser,isUpdatingProfile,profileUpdate}=useAuthStore()
  const [imga,setimga]=useState(null)
  const handlesubmit=async(e)=>{
const file=e.target.files[0]
if(!file) return ;

const reader=new FileReader()
reader.readAsDataURL(file)
reader.onload=async()=>{
  const base64Image=reader.result;
  setimga(base64Image)
  await profileUpdate({profilePic:base64Image})
}


}
  return (
    <div className='h-screen pt-10'>
      <div className='max-w-2xl mx-auto p-4 py=8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>


<div className='flex flex-col items-center gap-4'>
  <div className='relative'>
    <img src={imga||authUser.profilePic||"https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"} className='size-20 rounded-full object-cover border-4' alt="" />
    <label htmlFor="avatar" className={`bottom-0 right-0 absolute hover:scale-105 bg-base-content cursor-pointer p-2 transition-all duration-200 rounded-full ${isUpdatingProfile?"animate-pulse pointer-events-none":""}`} >
      <Camera className='w-5 h-5 text-base-200'/>
      <input type="file" id='avatar' className='hidden' accept='image/*' onChange={handlesubmit} disabled={isUpdatingProfile} />
    </label>
  </div>
  <p className='text-sm text-zinc-400'>
    {isUpdatingProfile?"uploading.":"click to upload"}
  </p>
</div>

<div className='space-y-4'>
  <div className='space-y-1.5'>
    <div className='text-sm text-zinc-400 flex items-center gap-2'>
      <User className='w-4 h-4'/>
      Name:
    </div>
    <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser.fullName}</p>
  </div>
  <div className='space-y-1.5'>
    <div className='text-sm text-zinc-400 flex items-center gap-2'>
      <Mail className='w-4 h-4'/>
      Email Address:
    </div>
    <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser.email}</p>

  </div>

</div>

        </div>

      </div>
      
    </div>
  )
}

export default Profile
