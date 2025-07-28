// import React, { useEffect, useState } from 'react';
// import { Share, Trash2, FileText, Video, Link, Hash } from 'lucide-react';
// import Button from './Button';


// interface NoteCardProps {
//   type: 'text' | 'video' | 'link' | 'document';
//   title: string;
//   subtitle?: string;
//   content?: string;
//   thumbnailUrl?: string;
//   tags: string[];
//   createdAt: string;
//   onShare?: () => void;
//   onDelete?: () => void;
// }

// const NoteCard: React.FC<NoteCardProps> = ({
//   type,
//   title,
//   subtitle,
//   content,
//   thumbnailUrl,
//   tags,
//   createdAt,
//   onShare,
//   onDelete,
// }) => {
//   const getTypeIcon = () => {
//     switch (type) {
//       case 'video':
//         return <Video className="w-4 h-4 text-gray-600" />;
//       case 'link':
//         return <Link className="w-4 h-4 text-gray-600" />;
//       case 'document':
//         return <FileText className="w-4 h-4 text-gray-600" />;
//       default:
//         return <FileText className="w-4 h-4 text-gray-600" />;
//     }
//   };

// const formatDate = (dateString: string) => {
//   const date = new Date(dateString);

//   const year = date.getFullYear();
//   const month = date.toLocaleString('en-US', { month: 'short' });
//   const day = date.getDate().toString().padStart(2, '0');
//   const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

//   return `${day} ${month} ${year}, ${time}`;
// };

// const [ogThumbnail, setOgThumbnail] = useState<string | null>(thumbnailUrl || null);

// useEffect(() => {
//   const fetchThumbnail = async () => {
//     if (type === 'video' && content?.includes('youtube')) {
//       const match = content.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/);
//       const ytId = match ? match[1] : null;
//       if (ytId) setOgThumbnail(`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`);
//     }

//     if (type === 'link' && content) {
//       try {
//         const res = await fetch('/api/og', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url: content }),
//         });
//          const text = await res.text();
//   const data = text ? JSON.parse(text) : {};
//         if (data.image) setOgThumbnail(data.image);
//       } catch (e) {
//         console.error('OG thumbnail fetch failed:', e);
//       }
//     }
//   };

//   fetchThumbnail();
// }, [type, content]);

// const getDomainFromURL = (url: string) => {
//   try {
//     const { hostname } = new URL(url);
//     return hostname.replace(/^www\./, '');
//   } catch {
//     return url;
//   }
// };


//   return (
//     <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 pb-2">
//         <div className="flex items-center gap-2">
//           {getTypeIcon()}
//           <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
//         </div>
//         <div className="flex items-center gap-1">
//           <Button
//             variant="ghost"
//             size="sm"
//             icon={Share}
//             onClick={onShare}
//             className="p-1.5 text-gray-400 hover:text-gray-600"
//           />
//           <Button
//             variant="ghost"
//             size="sm"
//             icon={Trash2}
//             onClick={onDelete}
//             className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50"
//           />
//         </div>
//       </div>

//       {/* Content */}
//       <div className="px-4 pb-4">
//           <div className="h-[180px] overflow-hidden mb-4 flex flex-col justify-start">
//         {subtitle && (
//           <h4 className="text-lg font-semibold text-gray-900 mb-3">{subtitle}</h4>
//         )}

//         {/* Video thumbnail */}
//         {/* {type === 'video' && (
//           <div className="bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
//             {thumbnailUrl ? (
//               <img
//                 src={thumbnailUrl}
//                 alt={title}
//                 className="w-full h-full object-cover rounded-lg"
//                 loading='lazy'
//               />
//             ) : (
//               <div className="flex flex-col items-center gap-2 text-gray-400">
//                 <FileText className="w-8 h-8" />
//                 <span className="text-sm">Video thumbnail</span>
//               </div>
//             )}
//           </div>
//         )} */}

//  {type === 'video' && ogThumbnail && content && (
//   <div className="rounded-lg overflow-hidden mb-3">
//      <a href={content} target="_blank" rel="noopener noreferrer">
//        <img
//          src={ogThumbnail}
//          alt="YouTube Video"
//        className="w-full h-32 object-cover"
//          loading="lazy"
//      />
//     </a>



//     {/* <p className="text-xs text-blue-600 mt-1 break-all underline">{content}</p> */}
//     <p className="text-xs text-blue-600 mt-1 break-all underline">
//   {getDomainFromURL(content)}
// </p>
//   </div>
// )}


// {type === 'link' && ogThumbnail && content && (
//   <div className="rounded-lg overflow-hidden mb-3">
//     <a href={content} target="_blank" rel="noopener noreferrer">
//       <img
//         src={ogThumbnail}
//         alt="Link Preview"
//         className="w-full h-32 object-cover"
//         loading="lazy"
//       />
//     </a>
//     {/* <p className="text-xs text-blue-600 mt-1 break-all underline">{content}</p> */}
//     <p className="text-xs text-blue-600 mt-1 break-all underline">
//   {getDomainFromURL(content)}
// </p>
//   </div>
// )}


//         {/* Text content */}
//         {content && (
//           <div className="text-gray-700 text-sm leading-relaxed mb-4">
//             <div dangerouslySetInnerHTML={{ __html: content }} />
//           </div>
//         )}
// </div>
//         {/* Tags */}
//           {tags.length==0 && (
//             <div className="min-h-[36px] mb-3 flex flex-wrap gap-2"></div>
//           )}

//         {tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-3">
//             {tags.map((tag) => (
//               <span

//                 key={tag}
//                 className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
//               >
//                 <Hash className="w-3 h-3" />
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Added date */}
//         <p className="text-xs text-gray-500">Added on {formatDate(createdAt)}</p>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;

// File: src/components/NoteCard.jsx
// import React, { useEffect, useState, useRef } from 'react';
// import { Share, Trash2, FileText, Video, Link, Hash, Image as ImageIcon } from 'lucide-react';

// const NoteCard: React.FC<NoteCardProps> = ({
//   type,
//   title,
//   subtitle,
//   content,
//   thumbnailUrl,
//   tags,
//   createdAt,
//   onShare,
//   onDelete,
// }) => {
//   const [ogThumbnail, setOgThumbnail] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [ogData, setOgData] = useState({});
//   const retryRef = useRef(false);
//   const abortControllerRef = useRef(null);

//   // Extract YouTube ID from URL
//   const getYouTubeId = (url) => {
//     const patterns = [
//       /youtu\.be\/([^#&?]{11})/,
//       /youtube\.com.*(?:v=|\/embed\/|\/v\/)([^#&?]{11})/,
//     ];

//     for (const pattern of patterns) {
//       const match = url.match(pattern);
//       if (match && match[1]) {
//         return match[1];
//       }
//     }
//     return null;
//   };

//   // Get domain name from URL
//   const getDomainFromURL = (url) => {
//     try {
//       const { hostname } = new URL(url);
//       return hostname.replace(/^www\./, '');
//     } catch {
//       return url;
//     }
//   };

//   const getTypeIcon = () => {
//     switch (type) {
//       case 'video': return <Video className="w-4 h-4 text-gray-600" />;
//       case 'link': return <Link className="w-4 h-4 text-gray-600" />;
//       case 'document': return <FileText className="w-4 h-4 text-gray-600" />;
//       default: return <FileText className="w-4 h-4 text-gray-600" />;
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = date.toLocaleString('en-US', { month: 'short' });
//     const day = date.getDate().toString().padStart(2, '0');
//     const time = date.toLocaleTimeString('en-US', { 
//       hour: '2-digit', 
//       minute: '2-digit',
//       hour12: false
//     }).replace(/^24/, '00');

//     return `${day} ${month} ${year}, ${time}`;
//   };

//   // Fetch Open Graph data
//   useEffect(() => {
//     abortControllerRef.current?.abort();
//     abortControllerRef.current = new AbortController();
//     const signal = abortControllerRef.current.signal;
    
//     if (!content) {
//       setOgThumbnail(thumbnailUrl || null);
//       setIsLoading(false);
//       return;
//     }

//     const fetchThumbnail = async () => {
//       setIsLoading(true);
//       retryRef.current = false;
      
//       try {
//         // YouTube handling
//         if (type === 'video') {
//           const ytId = getYouTubeId(content);
//           if (ytId) {
//             setOgThumbnail(`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
//             setOgData({ title, description: subtitle });
//             return;
//           }
//         }

//         // Fetch from backend API
//         const res = await fetch('/api/og', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ url: content }),
//           signal
//         });

//         if (!res.ok) throw new Error('OG fetch failed');
        
//         const data = await res.json();
//         if (data.image) {
//           setOgThumbnail(data.image);
//           setOgData({ title: data.title || title, description: data.description || subtitle });
//         } else {
//           setOgThumbnail(null);
//           setOgData({ title, description: subtitle });
//         }
//       } catch (error) {
//         if (error.name !== 'AbortError') {
//           console.error('Thumbnail fetch failed:', error);
//           setOgThumbnail(thumbnailUrl || null);
//           setOgData({ title, description: subtitle });
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchThumbnail();

//     return () => {
//       abortControllerRef.current?.abort();
//     };
//   }, [type, content, thumbnailUrl, title, subtitle]);

//   // Handle image loading errors
//   const handleImageError = (e) => {
//     const target = e.currentTarget;
    
//     // YouTube fallback
//     if (type === 'video' && content && !retryRef.current) {
//       const ytId = getYouTubeId(content);
//       if (ytId) {
//         retryRef.current = true;
//         target.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
//         return;
//       }
//     }
    
//     // Hide image after retry or if not YouTube
//     target.style.display = 'none';
//   };

//   // Render thumbnail preview
//   const renderThumbnail = () => {
//     if (isLoading) {
//       return (
//         <div className="w-full aspect-video rounded-md bg-gray-100 animate-pulse mb-3 flex items-center justify-center">
//           <div className="text-gray-400">
//             <ImageIcon className="w-8 h-8" />
//           </div>
//         </div>
//       );
//     }

//     if (!ogThumbnail) return null;

//     const isTwitter = content?.includes('twitter.com') || content?.includes('x.com');
//     const isLinkedIn = content?.includes('linkedin.com');

//     return (
//       <div className="w-full rounded-md overflow-hidden mb-3">
//         <a 
//           href={content} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           className="block"
//         >
//           <img
//             src={ogThumbnail}
//             alt="Preview"
//             className={`w-full h-auto ${
//               isTwitter || isLinkedIn 
//                 ? 'max-h-64 object-contain' 
//                 : 'aspect-video object-cover'
//             }`}
//             onError={handleImageError}
//             loading="lazy"
//           />
//         </a>
//         <p className="text-xs text-blue-600 mt-1 break-all underline">
//           {getDomainFromURL(content || '')}
//         </p>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full">
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 pb-2">
//         <div className="flex items-center gap-2">
//           {getTypeIcon()}
//           <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
//             {ogData.title || title}
//           </h3>
//         </div>
//         <div className="flex items-center gap-1">
//           <button
//             onClick={onShare}
//             className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
//           >
//             <Share className="w-4 h-4" />
//           </button>
//           <button
//             onClick={onDelete}
//             className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="px-4 pb-4 flex-grow flex flex-col">
//         <div className="flex-grow">
//           //@ts-ignore
//           {ogData.description && (
//             <h4 className="text-gray-700 text-sm mb-3 line-clamp-2">
//               {ogData.description}
//             </h4>
//           )}

//           {/* Render thumbnail for video/link */}
//           {(type === 'video' || type === 'link') && renderThumbnail()}

//           {/* Text content */}
//           {type === 'text' && content && (
//             <div className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
//               {content}
//             </div>
//           )}
//         </div>

//         {/* Tags */}
//         {tags.length > 0 && (
//           <div className="flex flex-wrap gap-2 mb-3 mt-auto">
//             {tags.map((tag) => (
//               <span
//                 key={tag}
//                 className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
//               >
//                 <Hash className="w-3 h-3" />
//                 {tag}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Added date */}
//         <p className="text-xs text-gray-500 mt-auto">Added on {formatDate(createdAt)}</p>
//       </div>
//     </div>
//   );
// };

// export default NoteCard;

// src/components/NoteCard.tsx
import React, { useEffect, useState, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import { Star, StarOff, Trash2, FileText, Video, Link, Hash, Image as ImageIcon } from 'lucide-react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import Button from './Button'; // Assuming Button is a TypeScript component

interface NoteCardProps {
  type: 'text' | 'video' | 'link' | 'document';
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

  // Extract YouTube ID from URL
  const getYouTubeId = (url: string): string | null => {
    const patterns = [
      /youtu\.be\/([^#&?]{11})/,
      /youtube\.com.*(?:v=|\/embed\/|\/v\/)([^#&?]{11})/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // Get domain name from URL
  const getDomainFromURL = (url: string): string => {
    try {
      const { hostname } = new URL(url);
      return hostname.replace(/^www\./, '');
    } catch {
      return url;
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-gray-600" />;
      case 'link': return <Link className="w-4 h-4 text-gray-600" />;
      case 'document': return <FileText className="w-4 h-4 text-gray-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  // Fetch Open Graph data
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
        // YouTube handling
        if (type === 'video') {
          const ytId = getYouTubeId(content);
          if (ytId) {
            setOgThumbnail(`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`);
            setOgData({ title, description: subtitle });
            return;
          }
        }

        // Fetch from backend API
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
          setOgData({ 
            title: data.title || title, 
            description: data.description || subtitle 
          });
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

    fetchThumbnail();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [type, content, thumbnailUrl, title, subtitle]);

  // Handle image loading errors
  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    
    // YouTube fallback
    if (type === 'video' && content && !retryRef.current) {
      const ytId = getYouTubeId(content);
      if (ytId) {
        retryRef.current = true;
        target.src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
        return;
      }
    }
    
    // Hide image after retry or if not YouTube
    target.style.display = 'none';
  };

  // Render thumbnail preview
  const renderThumbnail = () => {
    if (isLoading) {
      return (
        <div className="w-full aspect-video rounded-md bg-gray-100 animate-pulse mb-3 flex items-center justify-center">
          <div className="text-gray-400">
            <ImageIcon className="w-8 h-8" />
          </div>
        </div>
      );
    }

    if (!ogThumbnail) return null;

    const isTwitter = content?.includes('twitter.com') || content?.includes('x.com');
    const isLinkedIn = content?.includes('linkedin.com');

    return (
      <div key={content} className="w-full rounded-md overflow-hidden mb-3">
        <a 
          href={content} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <img
            src={ogThumbnail}
            alt="Preview"
            className={`w-full h-auto ${
              isTwitter || isLinkedIn 
                ? 'max-h-64 object-contain' 
                : 'aspect-video object-cover'
            }`}
            onError={handleImageError}
            loading="lazy"
          />
        </a>
        <p className="text-xs text-blue-600 mt-1 break-all underline">
          {content ? getDomainFromURL(content) : ''}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <h3 className="font-medium text-gray-900 text-sm line-clamp-1">
            {ogData.title || title}
          </h3>
        </div>
        <div className="flex items-center gap-1">
<button onClick={onToggleImportant} className="p-2 rounded-full cursor-pointer">
  {isImportant ? (
    <FaStar className="text-yellow-500 dark:text-yellow-400 text-xl" />
  ) : (
    <FaRegStar className="text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 text-xl" />
  )}
</button>


          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-4 flex-grow flex flex-col">
        <div className="flex-grow">
          {ogData.description && (
            <h4 className="text-gray-700 text-sm mb-3 line-clamp-2">
              {ogData.description}
            </h4>
          )}

          {/* Render thumbnail for video/link */}
          {(type === 'video' || type === 'link') && renderThumbnail()}

          {/* Text content */}
          {type === 'text' && content && (
            <div className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
              {content}
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3 mt-auto">
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
        )}

        {/* Added date */}
        <p className="text-xs text-gray-500 mt-auto">Added on {formatDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default NoteCard;