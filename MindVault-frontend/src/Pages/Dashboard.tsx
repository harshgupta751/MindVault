// import React, { useEffect, useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import NoteGrid from '../components/NoteGrid';
// import AddContentModal from '../components/AddContentModal';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import {toast} from 'react-hot-toast'
// import axiosInstance from '../api/axiosInstance';
// export const  Dashboard=()=>{
// const [notes, setNotes]= useState([])
// const navigate=useNavigate()


//   const notes = [
//     {
//       id: '1',
//       type: 'text' as const,
//       title: 'Project Ideas',
//       subtitle: 'Future Projects',
//       content: `
//         <ul class="space-y-1">
//           <li>• Build a personal knowledge base</li>
//           <li>• Create a habit tracker</li>
//           <li>• Design a minimalist todo app</li>
//         </ul>
//       `,
//       tags: [
//         { id: '1', name: 'productivity' },
//         { id: '2', name: 'ideas' }
//       ],
//       addedDate: '10/03/2024'
//     },
//     {
//       id: '2',
//       type: 'video' as const,
//       title: 'How to Build a Second Brain',
//       tags: [
//         { id: '3', name: 'productivity' },
//         { id: '4', name: 'learning' }
//       ],
//       addedDate: '09/03/2024'
//     },
//     {
//       id: '3',
//       type: 'text' as const,
//       title: 'Productivity Tip',
//       content: 'The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.',
//       tags: [
//         { id: '5', name: 'productivity' },
//         { id: '6', name: 'learning' }
//       ],
//       addedDate: '08/03/2024'
//     },
//        {
//       id: '5',
//       type: 'video' as const,
//       title: 'How to Build a Second Brain',
//       tags: [
//         { id: '8', name: 'productivity' },
//         { id: '9', name: 'learning' }
//       ],
//       addedDate: '09/03/2024'
//     },
//   ];

// async function getContent(){
// try{
// const response= await axiosInstance.get('/allcontent')
// setNotes(response.allContent)
// }catch(e){
//   toast.error("Data fetching failed. Please try again")
// }

// }

// // useEffect(()=>{
// // const token= localStorage.getItem('token');
// // if(!token){
// //   navigate('/')
// // }

// // },[])

// useEffect(()=>{

// getContent()

// },[])










//   const [activeMenuItem, setActiveMenuItem] = React.useState('tweets');
//   const [isAddContentModalOpen, setIsAddContentModalOpen] = React.useState(false);

// useEffect(()=>{
// const token= localStorage.getItem("token")
// if(!token){
//   navigate('/')
// }



// },[])




//   const handleShareNote = (noteId: string) => {
//     console.log('Share note:', noteId);
//   };

//   const handleDeleteNote = (noteId: string) => {
//     console.log('Delete note:', noteId);
//   };

//   const handleMenuItemClick = (item: string) => {
//     setActiveMenuItem(item);
//   };

//   const handleShareBrain = (e) => {
    
//   };

//   const handleAddContent = () => {
//     setIsAddContentModalOpen(true);
//   };

//   const handleCloseAddContentModal = () => {
//     setIsAddContentModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Fixed Sidebar */}
//       <div className="fixed top-0 left-0 bottom-0 w-64"> {/* Added fixed width */}
//         <Sidebar 
//           activeItem={activeMenuItem}
//           onItemClick={handleMenuItemClick}
//         />
//       </div>
      
//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col ml-64"> {/* Sidebar width offset */}
//         {/* Fixed Header with higher z-index */}
//         <div className="fixed top-0 right-0 left-64 z-20 bg-white shadow-sm"> {/* Increased z-index, added bg and shadow */}
//           <Header 
//             onShareBrain={handleShareBrain}
//             onAddContent={handleAddContent}
//           />
//         </div>
        
//         {/* Scrollable Content with proper top padding */}
//         <main className="flex-1 p-8 pt-24 overflow-y-auto"> {/* Increased top padding */}
//           <NoteGrid
//             notes={notes}
//             onShareNote={handleShareNote}
//             onDeleteNote={handleDeleteNote}
//           />
//         </main>
//       </div>
      
//       <AddContentModal 
//         isOpen={isAddContentModalOpen}
//         onClose={handleCloseAddContentModal}
//       />
//     </div>
//   );



// return (
//   <div className="h-screen flex overflow-hidden">
//     {/* Sidebar */}
//     <aside className="w-64 fixed top-0 left-0 h-screen bg-white border-r shadow-md z-20">
//       <Sidebar
//         activeItem={activeMenuItem}
//         onItemClick={handleMenuItemClick}
//       />
//     </aside>

//     {/* Main Content Wrapper */}
//     <div className="ml-64 flex flex-col w-full">
//       {/* Header */}
//       <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b shadow-sm z-10">
//         <Header
//           onShareBrain={() => handleShareBrain()}
//           onAddContent={handleAddContent}
//         />
//       </header>

//       {/* Scrollable Content Area */}
//       <main className="mt-16 p-6 overflow-y-auto h-[calc(100vh-4rem)] bg-gray-50">
//         <NoteGrid
//           notes={notes}
//           onShareNote={handleShareNote}
//           onDeleteNote={handleDeleteNote}
//         />
//       </main>
//     </div>

//     <AddContentModal
//       isOpen={isAddContentModalOpen}
//       onClose={handleCloseAddContentModal}
//     />
//   </div>
// );


  // return (
  //   <div className="min-h-screen bg-gray-50 flex">
  //     <Sidebar 
  //       activeItem={activeMenuItem}
  //       onItemClick={handleMenuItemClick}
  //     />
      
  //     <div className="flex-1 flex flex-col">
  //       <Header 
  //         onShareBrain={()=>handleShareBrain()}
  //         onAddContent={handleAddContent}
  //       />
        
  //       <main className="flex-1 p-8">
  //         <NoteGrid
  //           notes={notes}
  //           onShareNote={handleShareNote}
  //           onDeleteNote={handleDeleteNote}
  //         />
  //       </main>
  //     </div>
      
  //     <AddContentModal 
  //       isOpen={isAddContentModalOpen}
  //       onClose={handleCloseAddContentModal}
  //     />
  //   </div>
  // );






// }



// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import NoteGrid from '../components/NoteGrid';
// import AddContentModal from '../components/AddContentModal';

// export const Dashboard=()=>{
//   const notes = [
//     {
//       id: '1',
//       type: 'text' as const,
//       title: 'Project Ideas',
//       subtitle: 'Future Projects',
//       content: `
//         <ul class="space-y-1">
//           <li>• Build a personal knowledge base</li>
//           <li>• Create a habit tracker</li>
//           <li>• Design a minimalist todo app</li>
//         </ul>
//       `,
//       tags: [
//         { id: '1', name: 'productivity' },
//         { id: '2', name: 'ideas' }
//       ],
//       addedDate: '10/03/2024'
//     },
//     {
//       id: '2',
//       type: 'video' as const,
//       title: 'How to Build a Second Brain',
//       tags: [
//         { id: '3', name: 'productivity' },
//         { id: '4', name: 'learning' }
//       ],
//       addedDate: '09/03/2024'
//     },
//     {
//       id: '3',
//       type: 'text' as const,
//       title: 'Productivity Tip',
//       content: 'The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.',
//       tags: [
//         { id: '5', name: 'productivity' },
//         { id: '6', name: 'learning' }
//       ],
//       addedDate: '08/03/2024'
//     }
//   ];

//   const [activeMenuItem, setActiveMenuItem] = React.useState('tweets');
//   const [isAddContentModalOpen, setIsAddContentModalOpen] = React.useState(false);

//   const handleShareNote = (noteId: string) => {
//     console.log('Share note:', noteId);
//   };

//   const handleDeleteNote = (noteId: string) => {
//     console.log('Delete note:', noteId);
//   };

//   const handleMenuItemClick = (item: string) => {
//     setActiveMenuItem(item);
//   };

//   const handleShareBrain = () => {
//     console.log('Share brain clicked');
//   };

//   const handleAddContent = () => {
//     setIsAddContentModalOpen(true);
//   };

//   const handleCloseAddContentModal = () => {
//     setIsAddContentModalOpen(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <Sidebar 
//         activeItem={activeMenuItem}
//         onItemClick={handleMenuItemClick}
//       />
      
//       <div className="flex-1 flex flex-col">
//         <Header 
//           onShareBrain={handleShareBrain}
//           onAddContent={handleAddContent}
//         />
        
//         <main className="flex-1 p-8">
//           <NoteGrid
//             notes={notes}
//             onShareNote={handleShareNote}
//             onDeleteNote={handleDeleteNote}
//           />
//         </main>
        
//         <Footer />
//       </div>
      
//       <AddContentModal 
//         isOpen={isAddContentModalOpen}
//         onClose={handleCloseAddContentModal}
//       />
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import Sidebar from '../components/Sidebar';
// import Header from '../components/Header';
// import NoteGrid from '../components/NoteGrid';
// import AddContentModal from '../components/AddContentModal';
// import ShareableLinkModal from '../components/ShareableLinkModel';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'
// import {toast} from 'react-hot-toast'
// import axiosInstance from '../api/axiosInstance';

// export const Dashboard = () => {
//   const [notes, setNotes] = useState([])
//   const navigate = useNavigate()

//   // Sharable Link Modal State
//   const [isShareModalOpen, setIsShareModalOpen] = useState(false);
//   const [shareData, setShareData] = useState({
//     type: 'brain' as 'note' | 'brain',
//     title: '',
//     link: '',
//     isCopied: false
//   });

//   const notes = [
//     {
//       id: '1',
//       type: 'text' as const,
//       title: 'Project Ideas',
//       subtitle: 'Future Projects',
//       content: `
//         <ul class="space-y-1">
//           <li>• Build a personal knowledge base</li>
//           <li>• Create a habit tracker</li>
//           <li>• Design a minimalist todo app</li>
//         </ul>
//       `,
//       tags: [
//         { id: '1', name: 'productivity' },
//         { id: '2', name: 'ideas' }
//       ],
//       addedDate: '10/03/2024'
//     },
//     {
//       id: '2',
//       type: 'video' as const,
//       title: 'How to Build a Second Brain',
//       tags: [
//         { id: '3', name: 'productivity' },
//         { id: '4', name: 'learning' }
//       ],
//       addedDate: '09/03/2024'
//     },
//     {
//       id: '3',
//       type: 'text' as const,
//       title: 'Productivity Tip',
//       content: 'The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.',
//       tags: [
//         { id: '5', name: 'productivity' },
//         { id: '6', name: 'learning' }
//       ],
//       addedDate: '08/03/2024'
//     },
//     {
//       id: '5',
//       type: 'video' as const,
//       title: 'How to Build a Second Brain',
//       tags: [
//         { id: '8', name: 'productivity' },
//         { id: '9', name: 'learning' }
//       ],
//       addedDate: '09/03/2024'
//     },
//   ];

//   async function getContent() {
//     try {
//       const response = await axiosInstance.get('/allcontent')
//       setNotes(response.allContent)
//     } catch (e) {
//       toast.error("Data fetching failed. Please try again")
//     }
//   }

//   useEffect(() => {
//     getContent()
//   }, [])

//   const [activeMenuItem, setActiveMenuItem] = React.useState('tweets');
//   const [isAddContentModalOpen, setIsAddContentModalOpen] = React.useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       navigate('/')
//     }
//   }, [])

//   const handleShareNote = (noteId: string) => {
//     // Find the note to get its title
//     const note = notes.find(n => n.id === noteId);
    
//     setShareData({
//       type: 'note',
//       title: note?.title || 'Untitled Note',
//       link: `https://mindvault.app/shared/note/${noteId}`,
//       isCopied: false
//     });
//     setIsShareModalOpen(true);
//   };

//   const handleDeleteNote = (noteId: string) => {
//     console.log('Delete note:', noteId);
//   };

//   const handleMenuItemClick = (item: string) => {
//     setActiveMenuItem(item);
//   };

//   const handleShareBrain = () => {
//     setShareData({
//       type: 'brain',
//       title: 'My Brain Collection',
//       link: 'https://mindvault.app/shared/brain/your-brain-id',
//       isCopied: false
//     });
//     setIsShareModalOpen(true);
//   };

//   const handleAddContent = () => {
//     setIsAddContentModalOpen(true);
//   };

//   const handleCloseAddContentModal = () => {
//     setIsAddContentModalOpen(false);
//   };

//   const handleCloseShareModal = () => {
//     setIsShareModalOpen(false);
//     setShareData(prev => ({ ...prev, isCopied: false }));
//   };

//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(shareData.link).then(() => {
//       setShareData(prev => ({ ...prev, isCopied: true }));
//       toast.success('Link copied to clipboard!');
      
//       // Reset the copied state after 2 seconds
//       setTimeout(() => {
//         setShareData(prev => ({ ...prev, isCopied: false }));
//       }, 2000);
//     }).catch(() => {
//       toast.error('Failed to copy link');
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Fixed Sidebar */}
//       <div className="fixed top-0 left-0 bottom-0 w-64">
//         <Sidebar 
//           activeItem={activeMenuItem}
//           onItemClick={handleMenuItemClick}
//         />
//       </div>
      
//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col ml-64">
//         {/* Fixed Header with higher z-index */}
//         <div className="fixed top-0 right-0 left-64 z-20 bg-white shadow-sm">
//           <Header 
//             onShareBrain={handleShareBrain}
//             onAddContent={handleAddContent}
//           />
//         </div>
        
//         {/* Scrollable Content with proper top padding */}
//         <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-20 sm:pt-22 lg:pt-24 overflow-y-auto">
//           <NoteGrid
//             notes={notes}
//             onShareNote={handleShareNote}
//             onDeleteNote={handleDeleteNote}
//           />
//         </main>
//       </div>
      
//       {/* Modals */}
//       <AddContentModal 
//         isOpen={isAddContentModalOpen}
//         onClose={handleCloseAddContentModal}
//       />
      
//       <ShareableLinkModal
//         isOpen={isShareModalOpen}
//         onClose={handleCloseShareModal}
//         shareType={shareData.type}
//         title={shareData.title}
//         link={shareData.link}
//         onCopyLink={handleCopyLink}
//         isCopied={shareData.isCopied}
//       />
//     </div>
//   );
// };


import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import NoteGrid from '../components/NoteGrid';
import AddContentModal from '../components/AddContentModal';
import ShareableLinkModal from '../components/ShareableLinkModal';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import axiosInstance from '../api/axiosInstance';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CheckboxAtom, inputAtom, typeAtom } from '../store/atoms';
import useDebounce from '../hooks/useDebounce';

export const Dashboard = () => {
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
if(activeMenuItem!='all'){
filteredContent=filteredContent.filter((ele)=> ele.type===activeMenuItem)
}
setFilteredNotes(filteredContent)
return function(){
  setFilteredNotes([])
}

  }, [debouncedValue, activeMenuItem, notes])

  const handleShareNote = (noteId: string) => {
   
    const note = filteredNotes.find(n => n._id === noteId);
    
    setShareData({
      type: 'note',
      //@ts-ignore
      title: note?.title || 'Untitled Note',
      link: `https://mindvault.app/shared/note/${noteId}`,
      isCopied: false
    });
    setIsShareModalOpen(true);
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
            onShareNote={handleShareNote}
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