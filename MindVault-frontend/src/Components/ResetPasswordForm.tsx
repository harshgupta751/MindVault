import React, { useState } from 'react';
import { Brain, Lock, ArrowLeft, CheckCircle, EyeOff, Eye } from 'lucide-react';
import Button from './Button';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';
export const ResetPasswordForm: any = () => {

  const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [password, setPassword] = useState(""); 
    const [showPassword, setShowPassword] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [searchParams] = useSearchParams()
    const token= searchParams.get('token')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };
const navigate= useNavigate()
const onSubmit= async ()=>{
if(!password){
    toast.error("Enter new password!")
    return
}
if(!confirmPassword){
    toast.error("Enter confirm password!")
     return
}
if(password.length<6){
    toast.error("Password should be atleast 6 characters")
     return
}
if(password!=confirmPassword){
    toast.error("Passwords do not match")
     return
}
try{
 
const response= await axiosInstance.post('/createnewpassword',{
    token,
    password
})
if(response.status==400){
    toast.error("Link is expired!");
    setTimeout(()=>{navigate('/forgotpassword')},2000)
    return
}
setIsSubmitted(true)

}catch(e){
   toast.error("Error occured. Please try again!")
}


}


  if (isSubmitted) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
        <div className="bg-white shadow-xl border p-8 rounded-2xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Password Reset Successful!
          </h2>
          <p className="text-gray-600 mb-6">You can now login with your new password.</p>
          <Button onClick={() => navigate('/')} className="w-full">
            Go to Sign In
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">MindVault</h1>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Reset Password
          </h2>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
     
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
               New Password
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

                  <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
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


            {/* Submit Button */}
            <Button
              variant="primary"
              className="w-full py-3 text-base font-medium"
            >
              Reset Password
            </Button>
          </form>

          {/* Back to Login */}
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

        {/* Help Text */}
  
      </div>
    </div>
  );
};





// import React, { useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { Lock, CheckCircle, ArrowLeft } from 'lucide-react';
// import Button from './Button';
// import axiosInstance from '../api/axiosInstance';
// import { toast } from 'react-hot-toast';

// export const ResetPasswordForm = () => {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get('token');
//   const navigate = useNavigate();

//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match!');
//       return;
//     }

//     try {
//       const response = await axiosInstance.post('/createnewpassword', {
//         token,
//         password,
//       });

//       if (response.status === 200) {
//         toast.success('Password reset successful!');
//         setIsSubmitted(true);
//       }
//     } catch (err) {
//       toast.error('Invalid or expired token.');
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
//         <div className="bg-white shadow-xl border p-8 rounded-2xl w-full max-w-md text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <CheckCircle className="w-8 h-8 text-green-600" />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">
//             Password Reset Successful!
//           </h2>
//           <p className="text-gray-600 mb-6">You can now login with your new password.</p>
//           <Button onClick={() => navigate('/')} className="w-full">
//             Go to Sign In
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
//       <div className="bg-white shadow-xl border p-8 rounded-2xl w-full max-w-md">
//         <h2 className="text-xl font-semibold text-center text-gray-900 mb-6">Set a new password</h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               New Password
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Enter new password"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Confirm new password"
//               />
//             </div>
//           </div>

//           <Button type="submit" className="w-full py-3 text-base font-medium">
//             Reset Password
//           </Button>
//         </form>

//         <div className="mt-6">
//           <Button
//             variant="ghost"
//             className="w-full py-3 text-base font-medium"
//             icon={ArrowLeft}
//             onClick={() => navigate('/')}
//           >
//             Back to Sign In
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
