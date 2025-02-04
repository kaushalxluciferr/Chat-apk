import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import {  LucideCross } from 'lucide-react'

function Header() {
const {selectedUser,setSelectedUser}=useChatStore()
const {onlineUsers}=useAuthStore()

  return (
    <div className='p-2.5 border-b border-base-300'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <div className='avatar'>
                    <div className='size-8 rounded-full relative'>
                        <img src={selectedUser.profilePic||"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} alt="" />
                    </div>
                </div>
        <div>
          <h2 className='text-xl text-base-content '> {selectedUser.fullName}</h2>
           <p> {onlineUsers.includes(selectedUser._id)?"online":"offline"}</p>
        </div>
     </div>

     <button onClick={()=>setSelectedUser(null)} className='animate-spin'><LucideCross/></button>


        </div>
      
    </div>
  )
}

export default Header
