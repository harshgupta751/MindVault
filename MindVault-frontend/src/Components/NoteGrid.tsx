import React from 'react';
import NoteCard from './NoteCard';

interface Note {
  _id: string;
  type: 'note' | 'video' | 'link' | 'document';
  title: string;
  subtitle?: string;
  content?: string;
  thumbnailUrl?: string;
  tags: string[];
  isImportant: boolean;
  createdAt: string;
}

interface NoteGridProps {
  notes: Note[];
  toggleImportant?: (noteId: string, isImportant: boolean) => void;
  onDeleteNote?: (noteId: string) => void;
}

const NoteGrid: React.FC<NoteGridProps> = ({ notes, toggleImportant, onDeleteNote }) => {
  return (
    <>
    {notes.length==0?
      (
    <div className="flex flex-col items-center justify-center py-12 px-4 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full p-5 mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">No Content Found</h3>
        <p className="text-gray-500 text-center mb-6">
          No notes, links, videos or documents matches your current filters. Try adjusting your search.
        </p>
    </div>
  // <p className="text-center text-gray-500">No content found for this filter.</p>
):(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          id={note._id}
          type={note.type}
          title={note.title}
          subtitle={note.subtitle}
          content={note.content}
          thumbnailUrl={note.thumbnailUrl}
          tags={note.tags}
          isImportant={note.isImportant}
          createdAt={note.createdAt}
          onToggleImportant={() => toggleImportant?.(note._id, note.isImportant)}
          onDelete={onDeleteNote? () => onDeleteNote(note._id) : undefined}
        />
      ))}
    </div>
)
    }
    </>
  );
};

export default NoteGrid;