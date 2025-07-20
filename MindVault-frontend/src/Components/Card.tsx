import React from 'react';
import { Share, Trash2, FileText, Video, Link, Hash } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
  color?: string;
}

interface CardProps {
  id: string;
  type: 'text' | 'video' | 'link' | 'document';
  title: string;
  subtitle?: string;
  content?: string;
  thumbnailUrl?: string;
  tags: Tag[];
  addedDate: string;
  onShare?: () => void;
  onDelete?: () => void;
}

const Card: React.FC<CardProps> = ({
  type,
  title,
  subtitle,
  content,
  thumbnailUrl,
  tags,
  addedDate,
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">

      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onShare}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <Share className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-4">
        {subtitle && (
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{subtitle}</h4>
        )}

        {type === 'video' && (
          <div className="bg-gray-200 rounded-lg h-32 mb-4 flex items-center justify-center">
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <FileText className="w-8 h-8" />
                <span className="text-sm">Video thumbnail</span>
              </div>
            )}
          </div>
        )}

        {content && (
          <div className="text-gray-700 text-sm leading-relaxed mb-4">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
              >
                <Hash className="w-3 h-3" />
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-500">Added on {addedDate}</p>
      </div>
    </div>
  );
};

export default Card;




