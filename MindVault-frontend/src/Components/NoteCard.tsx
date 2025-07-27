import React, { useEffect, useState } from 'react';
import { Share, Trash2, FileText, Video, Link, Hash } from 'lucide-react';
import Button from './Button';


interface NoteCardProps {
  type: 'text' | 'video' | 'link' | 'document';
  title: string;
  subtitle?: string;
  content?: string;
  thumbnailUrl?: string;
  tags: string[];
  createdAt: string;
  onShare?: () => void;
  onDelete?: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  type,
  title,
  subtitle,
  content,
  thumbnailUrl,
  tags,
  createdAt,
  onShare,
  onDelete,
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4 text-gray-600" />;
      case 'link':
        return <Link className="w-4 h-4 text-gray-600" />;
      case 'document':
        return <FileText className="w-4 h-4 text-gray-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate().toString().padStart(2, '0');
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return `${day} ${month} ${year}, ${time}`;
};

const [ogThumbnail, setOgThumbnail] = useState<string | null>(thumbnailUrl || null);

useEffect(() => {
  const fetchThumbnail = async () => {
    if (type === 'video' && content?.includes('youtube')) {
      const match = content.match(/(?:youtu\.be\/|youtube\.com.*(?:v=|\/embed\/|\/v\/))([^?&\/\s]+)/);
      const ytId = match ? match[1] : null;
      if (ytId) setOgThumbnail(`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`);
    }

    if (type === 'link' && content) {
      try {
        const res = await fetch('/api/og', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: content }),
        });
        const data = await res.json();
        if (data.image) setOgThumbnail(data.image);
      } catch (e) {
        console.error('OG thumbnail fetch failed:', e);
      }
    }
  };

  fetchThumbnail();
}, [type, content]);

const getDomainFromURL = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};


  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            icon={Share}
            onClick={onShare}
            className="p-1.5 text-gray-400 hover:text-gray-600"
          />
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
      <div className="px-4 pb-4">
          <div className="h-[180px] overflow-hidden mb-4 flex flex-col justify-start">
        {subtitle && (
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{subtitle}</h4>
        )}

        {/* Video thumbnail */}
        {/* {type === 'video' && (
          <div className="bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover rounded-lg"
                loading='lazy'
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <FileText className="w-8 h-8" />
                <span className="text-sm">Video thumbnail</span>
              </div>
            )}
          </div>
        )} */}

 {type === 'video' && ogThumbnail && content && (
  <div className="rounded-lg overflow-hidden mb-3">
    <a href={content} target="_blank" rel="noopener noreferrer">
      <img
        src={ogThumbnail}
        alt="YouTube Video"
        className="w-full h-32 object-cover"
        loading="lazy"
      />
    </a>
    {/* <p className="text-xs text-blue-600 mt-1 break-all underline">{content}</p> */}
    <p className="text-xs text-blue-600 mt-1 break-all underline">
  {getDomainFromURL(content)}
</p>
  </div>
)}


{type === 'link' && ogThumbnail && content && (
  <div className="rounded-lg overflow-hidden mb-3">
    <a href={content} target="_blank" rel="noopener noreferrer">
      <img
        src={ogThumbnail}
        alt="Link Preview"
        className="w-full h-32 object-cover"
        loading="lazy"
      />
    </a>
    {/* <p className="text-xs text-blue-600 mt-1 break-all underline">{content}</p> */}
    <p className="text-xs text-blue-600 mt-1 break-all underline">
  {getDomainFromURL(content)}
</p>
  </div>
)}


        {/* Text content */}
        {content && (
          <div className="text-gray-700 text-sm leading-relaxed mb-4">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
</div>
        {/* Tags */}
          {tags.length==0 && (
            <div className="min-h-[36px] mb-3 flex flex-wrap gap-2"></div>
          )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
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
        <p className="text-xs text-gray-500">Added on {formatDate(createdAt)}</p>
      </div>
    </div>
  );
};

export default NoteCard;