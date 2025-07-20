import {Routes, Route} from 'react-router-dom'
import Dashboard from './Pages/dashboard'
import { SignUp } from './Pages/SignUp'
import { SignIn } from './Pages/SignIn'

function App() {


  return (
    <>
      <Routes>
        <Route path='/signup' element={<SignUp/>}></Route>
         <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </>
  )
}

export default App
