import React from 'react'
import { useThemeStore } from '../store/useTheme'
import THEMES from '../constants/index'

const PREVIEW_MESSAGES=[
  {id:1,content: "hey dude",isSent:false},
  {id:2,content:"yes dude ",isSent:true},
]
function Setting() {
  const {theme,setTheme}=useThemeStore()
  return (
    <div className='h-screen mx-auto px-4 pt-20 max-w-5xl'>
      <div className='space-y-6'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-semibold'> Theme</h2>
          <p className='text-sm text-base-content/70' Chhose Color></p>
        </div>
        <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2'>
          {THEMES.map((t)=>(
            <button key={t} className={`flex flex-col group items-center gap-1.5 p-2 rounded-lg transition-colors ${theme===t?"bg-base-200":"hover:bg-base-200/50"}`} onClick={()=>setTheme(t)}>
<div className='relative h-8 w-full rounded-md overflow-hidden' data-theme={t}>
<div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
  <div className='rounded bg-primary'></div>
  <div className='rounded bg-secondary'></div>
  <div className='rounded bg-accent'></div>
  <div className='rounded bg-neutral'></div>
</div>
</div>
<span>{t.charAt(0).toUpperCase()+t.slice(1)}</span>
            </button>
          ))}

        </div>

      </div>
      
    </div>
  )
}

export default Setting
