import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare,User } from 'lucide-react'
import { Link } from 'react-router-dom'
import Animation from '../component/Animation'

function Sighnup() {
  const [showpass,setshowpass]=useState(false)
  const [formData,setFormData]=useState({
    fullName:"",
    email:"",
    password:""
  })

  const {isSigninUp,signup}=useAuthStore()


const handleSubmit=async(e)=>{
  e.preventDefault()
  signup(formData)
}
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col justify-center items-start p-6 sm:p-12'>
       <div className='w-full max-w-md space-y-8'>
{/* logo  */}
        <div className='text-center mb-2'>
          <div className='flex flex-col items-center gap-2 group'>
            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
            <MessageSquare className='size-6 text-primary'/>
            </div>
            <h1 className='text-2xl font-bold mt-2'> Create Account</h1>
            <p className='text-base-content/60'> Get started with your Fre Account</p>
          </div>
        </div>

        {/* form section */}
        <form onSubmit={handleSubmit} className='space-y-2'>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium'>Full Name</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <User className='size-5 text-base-content/40'/>
              </div>
              <input type="text" className='input input-bordered w-full pl-10'
              required
              placeholder='Enter Full Name'
              value={formData.fullName}
              onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
              />
            </div>
          </div>
          {/* email */}

          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium'>Email:</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Mail className='size-5 text-base-content/40'/>
              </div>
              <input type="email" className='input input-bordered w-full pl-10'
              placeholder='Enter Your Email'
              required
              value={formData.email}
              onChange={(e)=>setFormData({...formData,email:e.target.value})}
              />
            </div>
          </div>
              {/* password */}
              <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium'>Password:</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Lock className='size-5 text-base-content/40'/>
              </div>
              <input type={showpass?"text":"password"} className='input input-bordered w-full pl-10'
              placeholder='Enter Your Password'
              required
              value={formData.password}
              onChange={(e)=>setFormData({...formData,password:e.target.value})}
              />
              <button type='button' className='inset-y-0 right-0 absolute pr-3 flex items-center'
              onClick={()=>setshowpass(!showpass)}
              >{showpass?(
                <EyeOff className='size-5 text-base-content/40'/>
              ):(<Eye className='size-5 text-base-content/40'/>)}</button>
            </div>
          </div>
            {/* button */}
            <button type='submit'
            className='btn btn-primary w-full'
            disabled={isSigninUp}
            >
{isSigninUp?(
  <>
  <Loader2 className='size-5 animate-spin'/>
  loading.....
  </>
):("Signup here")}
            </button>

        </form>
<div className='text-center'>
  <p className='text-base-content/60'>Already have An Account?  <Link to='/login' className='link link-primary'>Login</Link></p>
</div>

       </div>
      </div>
      <div className='mt-[180px] hidden sm:block'>
        <h1 className='ml-8 text-red-300 text-2xl mb-8'>Welcome to my chat App</h1>
       <Animation/>
      </div>

    </div>
  )
}

export default Sighnup
