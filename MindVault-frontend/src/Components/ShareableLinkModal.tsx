// import React, { useRef } from 'react';
// import { X, Copy, Share2, Check } from 'lucide-react';
// import { useRecoilState } from 'recoil';
// import { CheckboxAtom } from '../store/atoms';

// interface ShareableLinkModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   shareType: 'note' | 'brain';
//   title?: string;
//   link: string;
//   onCopyLink?: () => void;
//   isCopied?: boolean;
// }

// const ShareableLinkModal: React.FC<ShareableLinkModalProps> = ({
//   isOpen,
//   onClose,
//   shareType,
//   title,
//   link,
//   onCopyLink,
//   isCopied = false
// }) => {
//   const [checked, setChecked]= useRecoilState(CheckboxAtom)
//   //@ts-ignore
//   const inputRef= useRef<HTMLInputElement>()
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-100">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
//               <Share2 className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-gray-900">
//                 Share {shareType === 'brain' ? 'Brain' : 'Note'}
//               </h2>
//               {title && (
//                 <p className="text-sm text-gray-500 truncate max-w-48">
//                   {title}
//                 </p>
//               )}
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
//           >
//             <X className="w-4 h-4 text-gray-400" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Description */}
//           <div className="text-center space-y-2">
//             <p className="text-gray-600">
//               {shareType === 'brain' 
//                 ? 'Anyone with this link can view your entire brain collection'
//                 : 'Anyone with this link can view this note'
//               }
//             </p>
//             <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
//               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//               Public access
//             </div>
//           </div>

//           {/* Link Display */}
//           <div className="space-y-3">
//             <label className="block text-sm font-medium text-gray-700">
//               Shareable Link
//             </label>
//             <div className="flex items-center gap-2">
//               <div className="flex-1 relative">
//                 <input
//                   type="text"
//                   value={link}
//                   readOnly
//                   className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                   <Share2 className="w-4 h-4 text-gray-400" />
//                 </div>
//               </div>
//               <button
//                 onClick={onCopyLink}
//                 className={`px-4 py-3 rounded-lg font-medium text-sm transition-all flex items-center gap-2 min-w-[100px] justify-center ${
//                   isCopied
//                     ? 'bg-green-100 text-green-700 border border-green-200'
//                     : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
//                 }`}
//               >
//                 {isCopied ? (
//                   <>
//                     <Check className="w-4 h-4" />
//                     Copied
//                   </>
//                 ) : (
//                   <>
//                     <Copy className="w-4 h-4" />
//                     Copy
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Share Options */}
//           <div className="space-y-3">
//             <label className="block text-sm font-medium text-gray-700">
//               Share Options
//             </label>
//             <div className="space-y-3">
//               <label className="flex items-center gap-3 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   ref={inputRef}
//                  defaultChecked
//                   className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                 />
//                 <div className="flex-1">
//                   <div className="text-sm font-medium text-gray-700">
//                     Allow public viewing
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Anyone with the link can view this content
//                   </div>
//                 </div>
//               </label>
              
//               {shareType === 'brain' && (
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <div className="flex-1">
//                     <div className="text-sm font-medium text-gray-700">
//                       Allow searching
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       Viewers can search through your content
//                     </div>
//                   </div>
//                 </label>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between p-6 bg-gray-50 rounded-b-xl">
//           <div className="text-xs text-gray-500">
//             Link expires: Never
//           </div>
//           <div className="flex gap-2">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               Close
//             </button>
//             <button onClick={()=>setChecked(inputRef.current.checked)} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
//               Update Settings
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShareableLinkModal;



import React, { useRef, useState } from 'react';
import { X, Copy, Share2, Check } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { CheckboxAtom } from '../store/atoms';

interface ShareableLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareType: 'note' | 'brain';
  title?: string;
  link: string;
  onCopyLink?: () => void;
  isCopied?: boolean;
  onAccessChange?: (accessType: 'restricted' | 'public') => void;
}

const ShareableLinkModal: React.FC<ShareableLinkModalProps> = ({
  isOpen,
  onClose,
  shareType,
  title,
  link,
  onCopyLink,
  isCopied = false,
  onAccessChange
}) => {
  const [checked, setChecked] = useRecoilState(CheckboxAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [accessType, setAccessType] = useState<'restricted' | 'public'>('public');
  const [showRoleOptions, setShowRoleOptions] = useState(false);

  if (!isOpen) return null;

  const handleAccessChange = (type: 'restricted' | 'public') => {
    setAccessType(type);
    if (onAccessChange) onAccessChange(type);
  };

  const handleUpdateSettings = () => {
    setChecked(inputRef.current?.checked ?? false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Share2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Share {shareType === 'brain' ? 'Brain' : 'Note'}
              </h2>
              {title && (
                <p className="text-sm text-gray-500 truncate max-w-48">
                  {title}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Access Type Selector */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-700">General access</h3>
            
            {/* Restricted Option */}
            <div 
              className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition"
              onClick={() => handleAccessChange('restricted')}
            >
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="radio"
                  checked={accessType === 'restricted'}
                  onChange={() => handleAccessChange('restricted')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">
                  Restricted
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Only people with access can open with the link
                </div>
                {accessType === 'restricted' && (
                  <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    Restricted
                  </div>
                )}
              </div>
            </div>
            
            {/* Public Option */}
            <div 
              className="flex items-start gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition"
              onClick={() => handleAccessChange('public')}
            >
              <div className="flex items-center h-5 mt-0.5">
                <input
                  type="radio"
                  checked={accessType === 'public'}
                  onChange={() => handleAccessChange('public')}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-700">
                  Anyone with the link
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Anyone on the internet with the link can view
                </div>
                {accessType === 'public' && (
                  <div className="mt-3 space-y-3">
                    {/* Role Selector */}
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-700">Viewer</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Viewers of this {shareType} can view content
                        </div>
                      </div>
                  
                    </div>
                    
                    {/* Link Display */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Shareable Link
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={link}
                            readOnly
                            className="w-full px-4 py-2.5 pr-12 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Share2 className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                        <button
                          onClick={onCopyLink}
                          className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-all flex items-center gap-2 min-w-[100px] justify-center ${
                            isCopied
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-4 h-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-b-xl">
          <div className="text-xs text-gray-500">
            Link expires: Never
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={handleUpdateSettings}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareableLinkModal;