import React, { useEffect, useState, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import {
  Trash2,
  FileText,
  Video,
  Link,
  Hash,
  Image as ImageIcon,
  File
} from 'lucide-react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Button from './Button';


interface NoteCardProps {
  type: 'note' | 'video' | 'link' | 'document';
  title: string;
  subtitle?: string;
  content?: string;
  thumbnailUrl?: string;
  tags: string[];
  isImportant: boolean;
  createdAt: string;
  onToggleImportant?: () => void;
  onDelete?: () => void;
}

interface OGData {
  image?: string;
  title?: string;
  description?: string;
}

const NoteCard: React.FC<NoteCardProps> = ({
  type,
  title,
  subtitle,
  content,
  thumbnailUrl,
  tags,
  isImportant,
  createdAt,
  onToggleImportant,
  onDelete,
}) => {
  const [ogThumbnail, setOgThumbnail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ogData, setOgData] = useState<OGData>({});
  const retryRef = useRef<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const getYouTubeId = (url: string): string | null => {
    const patterns = [
      /youtu\.be\/([^#&?]{11})/,
      /youtube\.com.*(?:v=|\/embed\/|\/v\/)([^#&?]{11})/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) return match[1];
    }
    return null;
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-gray-600" />;
      case 'link':
        return <Link className="w-4 h-4 text-gray-600" />;
      case 'document':
        return <File className="w-4 h-4 text-gray-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    if (!content) {
      setOgThumbnail(thumbnailUrl || null);
      setIsLoading(false);
      return;
    }

    const fetchThumbnail = async () => {
      setIsLoading(true);
      retryRef.current = false;

      try {
        if (type === 'video') {
          const ytId = getYouTubeId(content);
          if (ytId) {
            setOgThumbnail(`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
            setOgData({ title, description: subtitle });
            return;
          }
        }

        const res = await fetch('/api/og', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: content }),
          signal
        });

        if (!res.ok) throw new Error('OG fetch failed');

        const data: OGData = await res.json();
        if (data.image) {
          setOgThumbnail(data.image);
          setOgData({ title: data.title || title, description: data.description || subtitle });
        } else {
          setOgThumbnail(null);
          setOgData({ title, description: subtitle });
        }
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Thumbnail fetch failed:', error);
          setOgThumbnail(thumbnailUrl || null);
          setOgData({ title, description: subtitle });
        }
      } finally {
        setIsLoading(false);
      }
    };

    if(type=='video'){
      fetchThumbnail();
    }else{
      setOgThumbnail(thumbnailUrl || null);
      setIsLoading(false);
    }

    return () => abortControllerRef.current?.abort();
  }, [type, content, thumbnailUrl, title, subtitle]);

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (type === 'video' && content && !retryRef.current) {
      const ytId = getYouTubeId(content);
      if (ytId) {
        retryRef.current = true;
        target.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        return;
      }
    }
    target.style.display = 'none';
  };

  const renderThumbnail = () => {
    if (isLoading) {
      return (
        <div className="w-full aspect-video rounded-md bg-gray-100 animate-pulse mb-3 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      );
    }

    if (!ogThumbnail) {
      if (type === 'link') {
        return (
          <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center mb-3">
            <p className="text-gray-400 text-sm">No preview available</p>
          </div>
        );
      }
      return null;
    }

    const isTwitter = content?.includes('twitter.com') || content?.includes('x.com');
    const isLinkedIn = content?.includes('linkedin.com');

    return (
      <div className="w-full rounded-md overflow-hidden mb-3">
        <a href={content} target="_blank" rel="noopener noreferrer">
          <img
            src={ogThumbnail}
            alt="Preview"
            className={`w-full ${
              isTwitter || isLinkedIn ? 'max-h-64 object-contain' : 'aspect-video object-cover'
            }`}
            onError={handleImageError}
            loading="lazy"
          />
        </a>
      </div>
    );
  };

const renderDocumentLink = () => {
  if (type === 'document' && content) {
    const isPDF = content.toLowerCase().endsWith('.pdf');

    return (
      <div className="w-full rounded-md border border-gray-100 bg-gray-50 p-3 flex items-center gap-2 mb-3">
        <File className="w-5 h-5 text-gray-600" />
<a
 href={`${import.meta.env.VITE_API_URL}/api/document-proxy?publicId=${encodeURIComponent(content!)}`}
  target="_blank"
  rel="noopener noreferrer"
>
  <p className="text-sm text-gray-700">
     ⬇️ <span className='text-sm text-blue-500'>Download</span> {decodeURIComponent(content?.split('/').pop() || '')}
  </p>
</a>


      </div>
    );
  }
  return null;
};


  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <h3 className="font-medium text-gray-900 text-sm line-clamp-1">{ogData.title || title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={onToggleImportant} className="p-2 rounded-full cursor-pointer">
            {isImportant ? (
              <FaStar className="text-yellow-500 text-xl" />
            ) : (
              <FaRegStar className="text-gray-400 hover:text-yellow-500 text-xl" />
            )}
          </button>
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              onClick={onDelete}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50"
            />
          )}
        </div>
      </div>

      <div className="px-4 pb-4 flex-grow flex flex-col justify-between">
<div className="min-h-[24px] mb-2">
  {ogData.description ? (
    <h4 className="text-gray-600 text-[15px] italic font-medium leading-snug tracking-tight transition duration-200 hover:text-blue-600 hover:drop-shadow-md">
      {ogData.description}
    </h4>
  ) : (
    <div className="invisible text-[15px] italic font-medium leading-snug tracking-tight">
      placeholder
    </div>
  )}
</div>



     {(type === 'video' || type === 'link') && renderThumbnail()}

{(type === 'video' || type === 'link') && content && (
  <a
    href={content}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline text-sm break-words mt-2 mb-3 block hover:text-blue-800 transition-colors"
  >
    {content}
  </a>
)}


        {renderDocumentLink()}

        {type === 'note' && content && (
          <div className="text-gray-700 text-sm leading-relaxed overflow-hidden mb-4 text-ellipsis line-clamp-[9] max-h-[200px]">
            {content}
          </div>
        )}

        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Hash className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500">Added on {formatDate(createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

