import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './Component/Dashboard'
import ForgotPassword from './Component/ForgetPasswordEmail'
import VerifyUser from './Component/VerifyUser'
import ForgetPasswordVerification from './Component/ForgetPasswordVerification'
import SetNewPassword from './Component/SetNewPassword'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/verifyYourself' element={<VerifyUser/>}/>
        <Route path='/forgetPassword' element={<ForgotPassword/>}/>
        <Route path='/forgetPasswordVerification' element={<ForgetPasswordVerification/>}/>
        <Route path='/setNewPassword' element={<SetNewPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
