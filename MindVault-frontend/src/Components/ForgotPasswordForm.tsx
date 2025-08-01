import React from 'react';
import { Brain, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from './Button';
import {  useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import {z} from 'zod'
import { toast } from 'react-hot-toast';
export const ForgotPasswordForm: any = () => {
  const [email, setEmail] = React.useState('');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
  };
const navigate= useNavigate()
const emailSchema= z.string().email()
const onSubmit = async (email: string)=>{
  if(!email){
    toast.error("Enter email!")
    return
  }
const result= emailSchema.safeParse(email)
if(!result.success){
  toast.error("Enter valid email!")
  return
}

  try{
const response= await axiosInstance.post('/resetpassword', {
  email
})

if(response.status==404){
  toast.error("Email not found!")
  return
}
if(response.status==200){
  toast.success( "Reset link sent to your email")
    setIsSubmitted(true);
}
  }catch(e){
    toast.error("Error occured. Please try again!")
  }
}

  if (isSubmitted) {
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
          </div>

       
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Check your email
            </h2>
            
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            
            <p className="text-sm text-gray-500 mb-8">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            <div className="space-y-3">
              <Button
                variant="primary"
                className="w-full py-3 text-base font-medium"
                onClick={() => setIsSubmitted(false)}
              >
                Try Again
              </Button>
              
              <Button
                variant="ghost"
                className="w-full py-3 text-base font-medium"
                onClick={()=>navigate('/')}
                icon={ArrowLeft}
              >
                Back to Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
     
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Second Brain</h1>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Forgot your password?
          </h2>
          <p className="text-gray-600">
            No worries! Enter your email address and we'll send you a reset link.
          </p>
        </div>

 
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
         
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full py-3 text-base font-medium"
            >
              Send Reset Link
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full py-3 text-base font-medium"
              onClick={()=>navigate('/')}
              icon={ArrowLeft}
            >
              Back to Sign In
            </Button>
          </div>
        </div>

  
      </div>
    </div>
  );
};

