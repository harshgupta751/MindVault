
const NoteSkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
    
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="animate-pulse bg-gray-200 rounded-full w-5 h-5"></div>
          <div className="animate-pulse bg-gray-200 rounded h-4 w-40"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="animate-pulse bg-gray-200 rounded-full w-8 h-8"></div>
          <div className="animate-pulse bg-gray-200 rounded-full w-8 h-8"></div>
        </div>
      </div>

    
      <div className="px-4 pb-4 flex-grow flex flex-col">
 
        <div className="min-h-[24px] mb-3">
          <div className="animate-pulse bg-gray-200 rounded h-5 w-full mb-1"></div>
          <div className="animate-pulse bg-gray-200 rounded h-5 w-4/5"></div>
        </div>

       
        <div className="animate-pulse bg-gray-200 rounded-lg h-44 mb-3"></div>

    
        <div className="animate-pulse bg-gray-200 rounded h-4 w-full mb-4"></div>

    
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="animate-pulse bg-gray-200 rounded-full w-16 h-6"></div>
          <div className="animate-pulse bg-gray-200 rounded-full w-14 h-6"></div>
        </div>

     
        <div className="mt-auto flex justify-between items-center">
          <div className="animate-pulse bg-gray-200 rounded h-4 w-28"></div>
        </div>
      </div>
    </div>
  );
};

const NoteSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <NoteSkeletonCard key={index} />
      ))}
    </div>
  );
};

export default NoteSkeletonGrid;