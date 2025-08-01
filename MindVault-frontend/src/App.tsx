import {Routes, Route} from 'react-router-dom'
import {Dashboard} from './Pages/Dashboard'
import { SignUp } from './Pages/SignUp'
import { SignIn } from './Pages/SignIn'
import { ForgotPasswordForm } from './Components/ForgotPasswordForm'
import { ResetPasswordForm } from './Components/ResetPasswordForm'
import { Toaster } from 'react-hot-toast'
import { SharedDashboard } from './Components/SharedDashboard'



function App() {


  return (
    <>
    <Toaster position='top-center'/>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
         <Route path='/' element={<SignIn/>}></Route>
         <Route path='/forgotpassword' element={<ForgotPasswordForm/>}></Route>
         <Route path='/resetpassword' element={<ResetPasswordForm/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/share' element={<SharedDashboard/>}></Route>
      </Routes>
    </>
  )
}

export default App
