import React, { useRef, useState } from 'react';
import { FileText, Video, Link, Upload, Hash,X } from 'lucide-react';
import Button from './Button';
import DocumentUploader from './DocumentUploader';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import { typeAtom } from '../store/atoms';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddContentModal: React.FC<AddContentModalProps> = ({ isOpen, onClose }) => {
const [content, setContent] = useState("");
const [type, setType] = useRecoilState(typeAtom)
const [title, setTitle] = useState("");
const [subtitle, setSubtitle] = useState("");

//@ts-ignore
const tagRef= useRef<HTMLInputElement>()
const [uploadedDocId, setUploadedDocId] = useState("");


  if (!isOpen) return null;

async function handleContentSubmission(){
if(!content || !type || !title){
toast.error("Fill all the required details!")
}else{
let temp=[];
if(tagRef.current.value!=""){
 temp= tagRef.current?.value.split(",").map((tag:any)=>tag.trim()) ;
}
const toastId= toast.loading("Adding...")
try{
await axiosInstance.post('/create', {
content,
type,
title,
subtitle,
tags: temp
})
toast.success("Added successfully!", {id: toastId})
setContent("")
setTitle("");
setType("");

tagRef.current.value="";
setSubtitle("");

}
catch(e){
toast.error("Error in adding occured. Please try again!", {id: toastId})
}

}

}


  const contentTypes = [
    {
      id: 'note',
      title: 'Text Note',
      description: 'Create a simple text note',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 'video',
      title: 'Video',
      description: 'Add a video link or upload',
      icon: Video,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      id: 'link',
      title: 'Web Link',
      description: 'Save a webpage or article',
      icon: Link,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      id: 'document',
      title: 'Document',
      description: 'Upload a file or document',
      icon: Upload,
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];






  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">

        {/* Fixed Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">Add Content</h2>
          <button
            onClick={async ()=>{

                  if(type=='document' && uploadedDocId){
              try{
                await axiosInstance.post('/deletepublicid',{
                  publicId: uploadedDocId
                })
              }catch(e){
                console.error('Failed to delete uploaded file', e);
              }
            }

              onClose()
              setContent("")
              setUploadedDocId("")
            }}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <p className="text-gray-600 mb-6">Choose the type of content you want to add to your MindVault</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {contentTypes.map((ctype) => {
                const Icon = ctype.icon;
                return (
                  <button
                    key={ctype.id}
                    onClick={()=> setType(ctype.id)}
                    className={`p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200 text-left group ${type==ctype.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg border ${ctype.color} group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{ctype.title}</h3>
                        <p className="text-sm text-gray-600">{ctype.description}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-gray-900 mb-4">Quick Add</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    onChange={(e)=>setTitle(e.target.value)}
                    placeholder="Enter a title for your content..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    onChange={(e)=>setSubtitle(e.target.value)}
                    placeholder="Add a brief description or subtitle..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  />
                </div>
                
                <div>
  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
    Content or URL
  </label>
  {type === 'document' ? (
    <DocumentUploader setContent={setContent} setUploadedDocId={setUploadedDocId} />
  ) : (
    <textarea
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
      placeholder="Write your note here..."
    />
  )}
</div>


                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      id="tags"
                      ref={tagRef}
                      placeholder="productivity, learning, ideas..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-6">
                    Separate tags with commas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <Button variant="secondary" onClick={async ()=>{

            if(type=='document' && uploadedDocId){
              try{
                await axiosInstance.post('/deletepublicid',{
                  publicId: uploadedDocId
                })
              }catch(e){
                console.error('Failed to delete uploaded file', e);
              }
            }

            onClose()
            setContent("")
            setUploadedDocId("")
          }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={async ()=>{
          await handleContentSubmission()
            onClose()

          }}>
            Add Content
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddContentModal;










