import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: string;
  currentLanguage: Language;
}

export function InfoModal({ isOpen, onClose, section, currentLanguage }: InfoModalProps) {
  if (!isOpen) return null;

  const sectionContent = content[section];
  if (!sectionContent) return null;

  const displayContent = sectionContent[currentLanguage];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden animate-fade-in">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 bg-[var(--mac-red)] rounded-full cursor-pointer" 
              onClick={onClose}
            ></div>
            <div className="w-3 h-3 bg-[var(--mac-yellow)] rounded-full"></div>
            <div className="w-3 h-3 bg-[var(--mac-green)] rounded-full"></div>
          </div>
          <div className="text-sm font-medium text-gray-700 capitalize">{section}</div>
          <div className="w-16"></div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-60px)]">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
            {displayContent}
          </pre>
        </div>
      </div>
    </div>
  );
}