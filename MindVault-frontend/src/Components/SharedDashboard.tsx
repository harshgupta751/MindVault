import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import SharedHeader from './SharedHeader';
import NoteGrid from './NoteGrid';
import {toast} from 'react-hot-toast'
import axiosInstance from '../api/axiosInstance';
import useDebounce from '../hooks/useDebounce';
import { useSearchParams } from 'react-router-dom';
import NoteSkeletonGrid from './NoteSkeletonGrid';

export const SharedDashboard = () => {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const headerRef = useRef<HTMLDivElement>(null);
const [headerHeight, setHeaderHeight] = useState(0);
const [searchParams] = useSearchParams()
const id= searchParams.get('id')
const [isMounting, setIsMounting] = useState(true)

  useEffect(()=>{
    const timer= setTimeout(()=>{
        setIsMounting(false)
    },1000)
  

return function(){
clearTimeout(timer)
}

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


  async function getContent() {
    try {
      const response = await axiosInstance.get(`/share/content/${id}`)
      if(response.status===200){
      //@ts-ignore
      setNotes(response.data.allContent) 
      }else if(response.status===404){
        toast.error("This link is not valid")
      }
    } catch (e) {
      toast.error("Error occured. Please try again!")
    }
  }

const [searchValue, setSearchValue] = useState("")
const debouncedValue= useDebounce(searchValue,500)

  const [activeMenuItem, setActiveMenuItem] = React.useState('all');
  useEffect(() => {
      getContent()

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

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
  };

  const handleToggleImportant =async  (noteId: string, isImportant: boolean) => {

  };



  return (
    <div className="min-h-screen bg-gray-50 flex">
    
      <div className="fixed top-0 left-0 bottom-0 w-64">
        <Sidebar 
          activeItem={activeMenuItem}
          onItemClick={handleMenuItemClick}
        />
      </div>
      
  
      <div className="flex-1 flex flex-col ml-64">
  
        <div className="fixed top-0 right-0 left-64 z-30 bg-white shadow-sm" ref={headerRef}>
          <SharedHeader 
          //@ts-ignore
          searchValue={searchValue}
          setSearchValue={setSearchValue}
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
          />
    )}
        </main>
      </div>
    </div>
  );
};