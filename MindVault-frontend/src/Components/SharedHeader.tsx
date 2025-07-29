

import React from 'react';
import { Search } from 'lucide-react';

interface SharedHeaderProps {
  title?: string;
  subtitle?: string;
  searchValue: string,
  setSearchValue: (value: string)=>void
}

const SharedHeader: React.FC<SharedHeaderProps> = ({ 
  title = "All Notes", 
  subtitle = "Shared knowledge collection",
  searchValue,
  setSearchValue
}) => {



  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title Section */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        
        {/* Search and Actions Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
          {/* Search Box */}
          <div className="relative flex-1 sm:flex-none sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search notes..."
              value={searchValue}
              onChange={(e)=>setSearchValue(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
            />
          </div> 
        </div>
      </div>
    </div>
  );
};

export default SharedHeader;