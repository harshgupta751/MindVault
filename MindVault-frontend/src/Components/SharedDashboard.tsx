
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import NoteGrid from './NoteGrid';
import AddContentModal from './AddContentModal';
import ShareableLinkModal from './ShareableLinkModal';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import axiosInstance from '../api/axiosInstance';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CheckboxAtom, inputAtom, typeAtom } from '../store/atoms';
import useDebounce from '../hooks/useDebounce';

export const SharedDashboard = () => {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const navigate = useNavigate()

  // Sharable Link Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareData, setShareData] = useState({
    type: 'brain' as 'note' | 'brain',
    title: '',
    link: '',
    isCopied: false
  });

 

  async function getContent() {
    try {
      const response = await axiosInstance.get('/allcontent')
      //@ts-ignore
      setNotes(response.data.allContent) 
    } catch (e) {
      toast.error("Data fetching failed. Please try again!")
    }
  }

const searchQuery  = useRecoilValue(inputAtom)
const debouncedValue= useDebounce(searchQuery,500)
const checked = useRecoilValue(CheckboxAtom)



  const [activeMenuItem, setActiveMenuItem] = React.useState('all');
  const [isAddContentModalOpen, setIsAddContentModalOpen] = React.useState(false);
const [type, setType] = useRecoilState(typeAtom)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate('/')
    }else{
      getContent()
    }
  }, [])

    useEffect(() => {
 let filteredContent= notes

if(debouncedValue){
//@ts-ignore
filteredContent=filteredContent.filter((ele)=>ele.title.toLowerCase().includes(debouncedValue.toLowerCase()))
}
if(activeMenuItem!='all' && activeMenuItem!='important'){
  //@ts-ignore
filteredContent=filteredContent.filter((ele)=> ele.type===activeMenuItem)
}
if(activeMenuItem=='important'){
  //@ts-ignore
filteredContent= filteredContent.filter((ele)=> ele.isImportant)
}

setFilteredNotes(filteredContent)
return function(){
  setFilteredNotes([])
}

  }, [debouncedValue, activeMenuItem, notes])

  const handleToggleImportant =async  (noteId: string, isImportant: boolean) => {
    try{
   await axiosInstance.post('/toggleimportant',{
    contentId: noteId,
    isImportant: isImportant
   })
getContent()

  }catch(e){
    toast.error("Error occured. Please try again!")
  }

  };

  const handleDeleteNote = async (noteId: string) => {
    try{
   await axiosInstance.delete(`/delete/${noteId}`)
  getContent()
    }catch(e){
        toast.error("Error occured. Please try again!")
    }
  };

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
  };

  const handleShareBrain = async () => {
try{
const response= await axiosInstance.get(`/share/settings/${checked}`);
if(checked){
    setShareData({
      type: 'brain',
      title: 'My Brain Collection',
      link: `http://localhost:5173${response.data.sharableId}`,
      isCopied: false
    });
  }else{
        setShareData({
      type: 'brain',
      title: 'My Brain Collection',
      link: "",
      isCopied: false
    });
  }
}catch(e){
  toast.error("Error occured. Please try again!")
}
    setIsShareModalOpen(true);
  };

  const handleAddContent = () => {
    setIsAddContentModalOpen(true);
  };

  const handleCloseAddContentModal = () => {
    setIsAddContentModalOpen(false);
    getContent()
    setType("")
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
  navigate('/')
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
    setShareData(prev => ({ ...prev, isCopied: false }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareData.link).then(() => {
      setShareData(prev => ({ ...prev, isCopied: true }));
      toast.success('Link copied to clipboard!');
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setShareData(prev => ({ ...prev, isCopied: false }));
      }, 2000);
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="fixed top-0 left-0 bottom-0 w-64">
        <Sidebar 
          activeItem={activeMenuItem}
          onItemClick={handleMenuItemClick}
        />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Fixed Header with higher z-index */}
        <div className="fixed top-0 right-0 left-64 z-30 bg-white shadow-sm">
          <Header 
            onShareBrain={handleShareBrain}
            onAddContent={handleAddContent}
            onLogout={handleLogout}
          />
        </div>
        
        {/* Scrollable Content with proper top padding */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 overflow-y-auto">
          <NoteGrid
            notes={filteredNotes}
            toggleImportant={handleToggleImportant}
            onDeleteNote={handleDeleteNote}
          />
        </main>
      </div>
      
      {/* Modals */}
      <AddContentModal 
        isOpen={isAddContentModalOpen}
        onClose={handleCloseAddContentModal}
      />
      
      <ShareableLinkModal
        isOpen={isShareModalOpen}
        onClose={handleCloseShareModal}
        shareType={shareData.type}
        title={shareData.title}
        link={shareData.link}
        onCopyLink={handleCopyLink}
        isCopied={shareData.isCopied}
      />
    </div>
  );
};