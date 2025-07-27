import {Routes, Route} from 'react-router-dom'
import {Dashboard} from './Pages/Dashboard'
import { SignUp } from './Pages/SignUp'
import { SignIn } from './Pages/SignIn'
import { ForgotPasswordForm } from './components/ForgotPasswordForm'



function App() {


  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
         <Route path='/' element={<SignIn/>}></Route>
         <Route path='/forgotpassword' element={<ForgotPasswordForm/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </>
  )
}

export default App
