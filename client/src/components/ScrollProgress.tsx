import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollProgressProps {
  sections: string[];
  currentSection: number;
  onSectionChange: (index: number) => void;
}

export function ScrollProgress({ sections, currentSection, onSectionChange }: ScrollProgressProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4"
    >
      {sections.map((section, index) => (
        <motion.div
          key={section}
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onSectionChange(index)}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === currentSection
                ? 'bg-cyberpunk-electric-blue border-cyberpunk-electric-blue shadow-lg shadow-cyberpunk-electric-blue'
                : 'border-cyberpunk-text-dim hover:border-cyberpunk-electric-blue'
            }`}
            animate={{
              scale: index === currentSection ? 1.2 : 1,
              boxShadow: index === currentSection 
                ? '0 0 20px var(--cyberpunk-electric-blue)' 
                : '0 0 0px transparent'
            }}
          />
          <motion.span
            className={`text-sm font-mono transition-all duration-300 ${
              index === currentSection
                ? 'text-cyberpunk-electric-blue opacity-100'
                : 'text-cyberpunk-text-dim opacity-0 group-hover:opacity-100'
            }`}
            initial={{ opacity: 0, x: 10 }}
            animate={{ 
              opacity: index === currentSection ? 1 : 0,
              x: index === currentSection ? 0 : 10 
            }}
          >
            {section}
          </motion.span>
        </motion.div>
      ))}
    </motion.div>
  );
}