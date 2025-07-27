import React from 'react';
import { Brain, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Brain className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-gray-600">
            © 2025 Second Brain. All rights reserved.
          </span>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <button className="hover:text-gray-900 transition-colors">
            Privacy Policy
          </button>
          <button className="hover:text-gray-900 transition-colors">
            Terms of Service
          </button>
          <button className="hover:text-gray-900 transition-colors">
            Help & Support
          </button>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for knowledge builders</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;