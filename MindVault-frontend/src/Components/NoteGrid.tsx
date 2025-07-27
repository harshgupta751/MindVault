import React from 'react';
import NoteCard from './NoteCard';

interface Note {
  _id: string;
  type: 'text' | 'video' | 'link' | 'document';
  title: string;
  subtitle?: string;
  content?: string;
  thumbnailUrl?: string;
  tags: string[];
  createdAt: string;
}

interface NoteGridProps {
  notes: Note[];
  onShareNote?: (noteId: string) => void;
  onDeleteNote?: (noteId: string) => void;
}

const NoteGrid: React.FC<NoteGridProps> = ({ notes, onShareNote, onDeleteNote }) => {
  return (
    <>
    {notes.length==0?
      (
  <p className="text-center text-gray-500">No content found for this filter.</p>
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
          createdAt={note.createdAt}
          onShare={() => onShareNote?.(note._id)}
          onDelete={() => onDeleteNote?.(note._id)}
        />
      ))}
    </div>
)
    }
    </>
  );
};

export default NoteGrid;