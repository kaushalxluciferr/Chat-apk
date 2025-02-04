import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Users } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

function Sidebar() {
const [showonlineuser,setshowonlineuser]=useState(false)
    const {getUsers,users,selectedUser,setSelectedUser,isUserLoading,messages}=useChatStore()
      const {onlineUsers}=useAuthStore()

     
      useEffect(()=>{
          getUsers()
        },[getUsers])
       
const filterOnlineUser=showonlineuser?users.filter(user=>onlineUsers.includes(user._id)):users

        // if(isUserLoading) return  <View/>
    


  return (
   <aside className='h-full w-24 lg:w-[180px] border-r border-base-300 flex flex-col transition-all duration-200'>
    <div className='border-b border-base-200 w-full p-5'>
<div className='flex items-center gap-2'>
    <Users className='size-6'/>
    <span className='font-medium hidden lg:block'>Contacts</span>
</div>
        {/*  online filter*/}
<div className='mt-3 hidden lg:flex items-center gap-2'>
<label className='gap-2 flex items-center cursor-pointer'>
    <input type="checkbox" className='checkbox checkbox-sm' checked={showonlineuser} onChange={(e)=>setshowonlineuser(e.target.checked)}  />
    <span className='text-sm text-gray-500'>show Online Only</span>
</label>
<span className='text-xs text-green-500'>({onlineUsers.length-1} Online)</span>
</div>

    </div>
<div className='overflow-y-auto w-full py-1'>

    {filterOnlineUser.map((user)=>(
        <button key={user._id}
        onClick={()=>setSelectedUser(user)}
        className={`p-3 flex items-center w-full hover:bg-base-200 gap-3 transition-colors ${selectedUser?._id===user._id?"bg-base-300 ring-1 ring-base-200":""}`}>
            <div className='relative mx-auto lg:mx-0'>
                <img src={user.profilePic||"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} className='size-12 object-cover rounded-full' alt="" />
                {onlineUsers.includes(user._id)&&(
                    <span className='absolute right-0 bottom-0 size-3 bg-green-600 ring-2 ring-gray-500 rounded-full'></span>
                )}
            </div>
            {/* user info */}

            <div className='hidden lg:block text-left min-w-0'>
                <div className='font-medium truncate'>
                    {user.fullName}
                </div>
                <div className='text-sm text-zinc-400'>
                    {onlineUsers.includes(user._id)?"online":"offline"}
                </div>
            </div>

        </button>
    ))}

</div>
   </aside>
  )
}

export default Sidebar
