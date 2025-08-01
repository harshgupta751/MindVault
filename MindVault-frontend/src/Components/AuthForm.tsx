import React, { useState } from 'react';
import { Brain, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Button from './Button';
import {z} from 'zod';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


interface AuthFormProps {
  mode?: 'login' | 'signup';
  onModeChange?: (mode: 'login' | 'signup') => void;
  onSubmit?: (data: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ 
  mode = 'login',
  onModeChange
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] =  useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
const navigate= useNavigate()
  const isLogin = mode === 'login';
const emailSchema= z.string().email()
const handleSignUp=async ()=>{
  if(!name){
    toast.error("Full name is required!");
    return
  }
if(name.length<3){
  toast.error("Full name must be atleast 3 characters!");
  return
}
  if(!email){
   toast.error("Email is required!");
    return
  }

const res=emailSchema.safeParse(email);
if(!res.success){
  toast.error("Enter valid email!");
  return
}
if(!password){
  toast.error("Password is required!");
  return
}
if(password.length<6){
  toast.error("Password should be atleast 6 characters!")
  return
}
if(!confirmPassword){
  toast.error("Enter confirm password!");
  return
}
if(password!=confirmPassword){
  toast.error("Passwords do not match!");
  return;
}
 const toastId= toast.loading("Signing up...")
try{
const response= await axiosInstance.post('/signup',{
  email,
  name,
  password
})
 //@ts-ignore
if(response.data.message==="User already exists!"){
   //@ts-ignore
   toast.error("User already exists!", {id: toastId})
  return
}else{
  const res= await axiosInstance.post('/signin',{
    email, 
    password
  })
localStorage.setItem('token', res.data.token)
toast.success("SignUp successfull. Redirecting...", {id: toastId})
setTimeout(()=>{
navigate('/dashboard')
},2000)
}
}catch(e){
  toast.error("Error occured. Please try again!", {id: toastId})
}

}
  



const handleSignIn=async ()=>{
   if(!email){
    toast.error("Email is required!");
    return
  }
const res=emailSchema.safeParse(email);
if(!res.success){
  toast.error("Enter valid email!");
  return
}
if(!password){
  toast.error("Password is required!");
  return
}
try{
const response= await axiosInstance.post('/signin',{
  email,
  password
})
 //@ts-ignore
if(response.data.token){
   //@ts-ignore
localStorage.setItem("token",response.data.token)
navigate('/dashboard')

}else if(response.data.message=="User does not exist!"){
   //@ts-ignore
   toast.error("User does not exist!")
}
else if(response.data.message=="Wrong Password!"){
    toast.error("Wrong Password!")
}
}catch(e){
  toast.error("Error occured. Please try again!")
}

}

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">MindVault</h1>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-gray-600">
            {isLogin 
              ? 'Sign in to access your personal knowledge base' 
              : 'Start building your second brain today'
            }
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form className="space-y-6" onSubmit={(e)=>{
                  e.preventDefault()
                if(isLogin){
                  handleSignIn()
                }else{
                  handleSignUp()
                }
              }}>
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    onChange={(e)=>setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    //@ts-ignore
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={()=>navigate('/forgotpassword')}
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

   

            <Button
              variant="primary"
              className="w-full py-3 text-base font-medium"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              type="button"
              onClick={() =>{ onModeChange?.(isLogin ? 'signup' : 'login')
                if(isLogin){
                  navigate('/signup')
                }else{
                  navigate('/')
                }
              }
              }
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;