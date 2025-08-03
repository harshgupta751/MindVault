import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import NoteGrid from '../Components/NoteGrid';
import AddContentModal from '../Components/AddContentModal';
import ShareableLinkModal from '../Components/ShareableLinkModal';
import NoteSkeletonGrid from '../Components/NoteSkeletonGrid';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'
import axiosInstance from '../api/axiosInstance';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTypeAtom, inputAtom, typeAtom } from '../store/atoms';
import useDebounce from '../hooks/useDebounce';

export const Dashboard = () => {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const navigate = useNavigate()
const headerRef = useRef<HTMLDivElement>(null);
const [headerHeight, setHeaderHeight] = useState(0);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareData, setShareData] = useState({
    link: '',
    isCopied: false
  });

  const [hasInitializedAccessType, setHasInitializedAccessType] = useState(false) 
  const [isMounting, setIsMounting] = useState(true)
const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(()=>{
    const timer= setTimeout(()=>{
        setIsMounting(false)
    },1000)
  

return function(){
clearTimeout(timer)
}

  },[])

  async function getContent() {
    try {
      const response = await axiosInstance.get('/allcontent')
    
      setNotes(response.data.allContent) 
    } catch (e) {
      toast.error("Data fetching failed. Please try again!")
    }
  }

const searchQuery  = useRecoilValue(inputAtom)
const debouncedValue= useDebounce(searchQuery,500)
const [accessType,setAccessType] = useRecoilState(accessTypeAtom)



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
filteredContent=filteredContent.filter((ele)=>ele.title.toLowerCase().includes(debouncedValue.toLowerCase()) || ele.subtitle?.toLowerCase()?.includes(debouncedValue.toLowerCase()))
}
if(activeMenuItem!='all' && activeMenuItem!='important'){
//@ts-ignore
filteredContent=filteredContent.filter((ele)=> ele.type===activeMenuItem)
}
if(activeMenuItem=='important'){
//@ts-ignore
filteredContent= filteredContent.filter((ele)=> ele.isImportant)
}
//@ts-ignore
filteredContent.sort((note1, note2)=> new Date(note2.createdAt) - new Date(note1.createdAt))

setFilteredNotes(filteredContent)
return function(){
  setFilteredNotes([])
}

  }, [debouncedValue, activeMenuItem, notes])


  useEffect(()=>{

  async function temperoryFunction(){
    try{
    const response= await axiosInstance.get('/sharemode')
        if(response.data.shareOn===true){
          setAccessType('public')
        }else if(response.data.shareOn===false){
          setAccessType('restricted')
        }
        setHasInitializedAccessType(true)

    }catch(error: any){
    if(error.response?.status===403){
          toast.error("Error occured. Please refresh the page!")
          return
        }
      toast.error("Error occured. Please refresh the page!")
    }

    }

    temperoryFunction()

  },[])

useEffect(() => {
  const updateHeight = () => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight + 12);
    }
  };

  updateHeight(); 

  window.addEventListener("resize", updateHeight); 

  return () => window.removeEventListener("resize", updateHeight);
}, []);



  const handleToggleImportant =async  (noteId: string, isImportant: boolean) => {
    const toastId= toast.loading("Updating...")
    try{
   await axiosInstance.post('/toggleimportant',{
    contentId: noteId,
    isImportant: isImportant
   })
getContent()
 toast.success("Updated successfully!", {id: toastId})

  }catch(e){
    toast.error("Error occured. Please try again!", {id: toastId})
  }

  };


  useEffect(()=>{
if(hasInitializedAccessType){
  handleShareBrain()
}

  },[accessType, hasInitializedAccessType])

  const handleDeleteNote = async (noteId: string) => {
    const toastId= toast.loading("Deleting...")
    try{
   await axiosInstance.delete(`/delete/${noteId}`)
  getContent()
  toast.success("Deleted successfully!", {id: toastId})
    }catch(e){
        toast.error("Error occured. Please try again!", {id: toastId})
    }
  };

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
  };

  const handleShareBrain = async () => {
try{
const response= await axiosInstance.post(`/share/settings/${accessType==='public'}`);
if(accessType==='public'){
    setShareData({
      link: `${import.meta.env.VITE_CLIENT_URL}${response.data.sharableId}`,
      isCopied: false
    });
  }else{
        setShareData({
      link: "",
      isCopied: false
    });
  }

}catch(e){
  toast.error("Error occured. Please try again!")
}

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
      
     
      setTimeout(() => {
        setShareData(prev => ({ ...prev, isCopied: false }));
      }, 2000);
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };


  return (
    <div className="min-h-screen bg-gray-50 flex">
    

{isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
    onClick={() => setIsSidebarOpen(false)}
  />
)}


<div className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out
  ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:z-auto`}>
  <Sidebar 
    activeItem={activeMenuItem}
    onItemClick={(item) => {
      handleMenuItemClick(item);
      setIsSidebarOpen(false); 
    }}
  />
</div>

      
    
      <div className="flex-1 flex flex-col ">
      
        <div className="fixed top-0 right-0 lg:left-64 left-0 z-30 bg-white shadow-sm" ref={headerRef}>
          <Header 
            onShareBrain={()=>setIsShareModalOpen(true)}
            onAddContent={handleAddContent}
            onLogout={handleLogout}
             onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          />
        </div>
        
       
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto"
  style={{ paddingTop: `${headerHeight}px` }}>
    {isMounting? (
      <NoteSkeletonGrid />
    ) : (
          <NoteGrid
            notes={filteredNotes}
            toggleImportant={handleToggleImportant}
            onDeleteNote={handleDeleteNote}
          />
    )}
        </main>
      </div>
      
    
      <AddContentModal 
        isOpen={isAddContentModalOpen}
        onClose={handleCloseAddContentModal}
      />
      
      <ShareableLinkModal
        isOpen={isShareModalOpen}
        onClose={handleCloseShareModal}
        link={shareData.link}
        onCopyLink={handleCopyLink}
        isCopied={shareData.isCopied}
      />
    </div>
  );
};