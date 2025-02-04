import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Cross, Image, Send } from 'lucide-react'
import { toast } from 'react-toastify'

function MessageList() {
const [text,settext]=useState("")
const [imagePreview,setimagePreview]=useState(null)
const fileRef=useRef()
const {sendMessage}=useChatStore()

const handleImage=(e)=>{
const file=e.target.files[0]
if(!file.type.startsWith("image/"))
{
    toast.error("please select image")
    return 
}
const reader=new FileReader()
reader.onload=()=>{
    setimagePreview(reader.result)
}
reader.readAsDataURL(file)
}


const deleteImage=()=>{
setimagePreview(null)
if(fileRef.current) fileRef.current.value=""
}


const handleSend=async(e)=>{
e.preventDefault()
if(!text.trim()&&!imagePreview) return 
try{
await sendMessage({text:text.trim(),
    image:imagePreview
})
settext("")
setimagePreview(null)
if(fileRef.current) fileRef.current.value=""
}catch(error)
{
    toast.error("message not sent")
}
}

  return (
    <div className='p-4 w-full'>
        {imagePreview&&(
            <div className='mb-3 items-center gap-2'>
                <div className='relative'>
<img src={imagePreview} className='w-20 h-20 object-cover rounded-lg border border-zinc-700' alt="" />
<button
type='button'
className='flex items-center justify-center absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full '
onClick={deleteImage}
><Cross className='animate-spin size-4'/></button>
                </div>
            </div>
        )}
      {/* /send messgae */}

<form onSubmit={handleSend} className='flex items-center gap-2'>
    <div className='flex-1 flex gap-2'>
<input type="text" className='w-full input input-bordered rounded-lg input-sm sm:input-md'placeholder='Enter your message' value={text} onChange={(e)=>settext(e.target.value)} />
<input type="file" accept='image/*' className='hidden' ref={fileRef} onChange={handleImage} />
<button className={` sm:flex btn btn-circle  ${imagePreview?"text-emerald-400":"text-zinc-500"}`} type='button' onClick={()=>fileRef.current?.click()}>
<Image size={20}/>

</button>
    </div>

    <button className='btn btn-circle ' type='submit' disabled={!text.trim()&&!imagePreview}><Send/></button>
</form>


    </div>
  )
}

export default MessageList
