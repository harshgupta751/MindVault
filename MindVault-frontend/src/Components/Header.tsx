import React from 'react';
import { Share, Plus, Search, LogOut, Menu } from 'lucide-react';
import Button from './Button';
import { useRecoilState } from 'recoil';
import { inputAtom } from '../store/atoms';


interface HeaderProps {
  title?: string;
  subtitle?: string;
  onShareBrain?: () => void;
  onAddContent?: () => void;
  onLogout?: () => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "MindVault", 
  subtitle = "Your knowledge hub for notes, links, videos & documents",
  onShareBrain,
  onAddContent,
  onLogout,
  onToggleSidebar
}) => {

const [searchQuery, setSearchQuery] = useRecoilState(inputAtom)






  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      
        <div className="flex-shrink-0">
          <button
  className="lg:hidden p-2 rounded hover:bg-gray-100"
  onClick={onToggleSidebar}
>
  <Menu className="w-6 h-6 text-gray-700" />
</button>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        
    
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
       
          <div className="relative flex-1 sm:flex-none sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
            />
          </div>
          
       
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="secondary"
              icon={Share}
              onClick={onShareBrain}
              size="md"
              className="flex-1 sm:flex-none"
            >
              <span className="hidden sm:inline">Share Brain</span>
              <span className="sm:hidden">Share</span>
            </Button>
            
            <Button
              variant="primary"
              icon={Plus}
              onClick={onAddContent}
              size="md"
              className="flex-1 sm:flex-none"
            >
              <span className="hidden sm:inline">Add Content</span>
              <span className="sm:hidden">Add</span>
            </Button>
            
            <Button
              variant="ghost"
              icon={LogOut}
              onClick={onLogout}
              size="md"
              className="flex-shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Header;