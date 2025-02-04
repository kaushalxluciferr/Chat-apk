
import './App.css'
import Navbar from './component/Navbar'
import {Navigate, Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Sighnup from './pages/Sighnup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {ToastContainer} from 'react-toastify'
import {Loader} from 'lucide-react'
import { useThemeStore } from './store/useTheme'

function App() {

  const {theme}=useThemeStore()
const {authUser,checkAuth,isCheckingAuth}=useAuthStore()

useEffect(()=>{
checkAuth()
},[checkAuth])


if(isCheckingAuth&&!authUser)
{
return ( <div className='flex justify-center items-center h-screen'>
  <Loader className='size-10 animate-spin'/>
</div> )
}



  return (
   <div data-theme={theme}>

<Navbar/>
<Routes>
<Route path='/' element={authUser?<Home/>:<Navigate to='/login'/>}/>
<Route path='/login' element={!authUser?<Login/>:<Navigate to='/'/>}/>
<Route path='/signup' element={!authUser? <Sighnup/>:<Navigate to='/'/>}/>
<Route path='/profile' element={authUser?<Profile/>:<Navigate to='/login'/>}/>
<Route path='/settings' element={authUser?<Setting/>:<Navigate to='/login'/>}/>
</Routes>


<ToastContainer position='bottom-right'/>
   </div>
  )
}

export default App
