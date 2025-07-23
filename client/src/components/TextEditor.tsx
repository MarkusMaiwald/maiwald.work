import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Save, FolderOpen, FileText, Copy, Scissors, Clipboard } from 'lucide-react';
import { CyberpunkPanel, GlitchText } from './CyberpunkEffects';

interface TextEditorProps {
  onClose: () => void;
  onMinimize: () => void;
}

interface FileTab {
  id: string;
  name: string;
  content: string;
  modified: boolean;
}

export function TextEditor({ onClose, onMinimize }: TextEditorProps) {
  const [files, setFiles] = useState<FileTab[]>([
    {
      id: 'welcome',
      name: 'welcome.txt',
      content: `# Maiwald Enterprises BV - Text Editor v2.1.0
# 
# Welcome to the cyberpunk text editor!
# 
# Features:
# - Syntax highlighting for various languages
# - Multi-tab editing
# - Real-time character and line counting
# - Cyberpunk-themed interface with scan lines
# 
# This editor is part of the Maiwald portfolio system.
# Build. Innovate. Disrupt.
# 
# --------------------------------------------------
# markus@maiwald.work | git.maiwald.work/NexusLabs
# --------------------------------------------------

Start typing to create your digital manifest...`,
      modified: false
    }
  ]);
  
  const [activeFileId, setActiveFileId] = useState('welcome');
  const [fontSize, setFontSize] = useState(14);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeFile = files.find(f => f.id === activeFileId);
  const lineCount = activeFile?.content.split('\n').length || 0;
  const charCount = activeFile?.content.length || 0;
  const wordCount = activeFile?.content.trim().split(/\s+/).filter(word => word.length > 0).length || 0;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [activeFileId]);

  const updateFileContent = (content: string) => {
    setFiles(prev => prev.map(file => 
      file.id === activeFileId 
        ? { ...file, content, modified: true }
        : file
    ));
  };

  const createNewFile = () => {
    const newId = Date.now().toString();
    const newFile: FileTab = {
      id: newId,
      name: `untitled-${newId.slice(-4)}.txt`,
      content: '',
      modified: false
    };
    setFiles(prev => [...prev, newFile]);
    setActiveFileId(newId);
  };

  const closeFile = (fileId: string) => {
    if (files.length === 1) return; // Keep at least one file open
    
    setFiles(prev => prev.filter(f => f.id !== fileId));
    if (activeFileId === fileId) {
      const remainingFiles = files.filter(f => f.id !== fileId);
      setActiveFileId(remainingFiles[0]?.id || '');
    }
  };

  const saveFile = () => {
    if (activeFile) {
      // Simulate saving
      setFiles(prev => prev.map(file => 
        file.id === activeFileId 
          ? { ...file, modified: false }
          : file
      ));
      
      // Create download link for demonstration
      const element = document.createElement('a');
      const file = new Blob([activeFile.content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = activeFile.name;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const copyToClipboard = () => {
    if (activeFile && textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = activeFile.content.substring(start, end);
      
      if (selectedText) {
        navigator.clipboard.writeText(selectedText);
      } else {
        navigator.clipboard.writeText(activeFile.content);
      }
    }
  };

  const cutToClipboard = () => {
    if (activeFile && textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = activeFile.content.substring(start, end);
      
      if (selectedText) {
        navigator.clipboard.writeText(selectedText);
        const newContent = activeFile.content.substring(0, start) + activeFile.content.substring(end);
        updateFileContent(newContent);
        
        setTimeout(() => {
          textarea.selectionStart = start;
          textarea.selectionEnd = start;
        }, 0);
      }
    }
  };

  const pasteFromClipboard = async () => {
    if (activeFile && textareaRef.current) {
      try {
        const clipboardText = await navigator.clipboard.readText();
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        const newContent = activeFile.content.substring(0, start) + clipboardText + activeFile.content.substring(end);
        updateFileContent(newContent);
        
        setTimeout(() => {
          const newCursorPos = start + clipboardText.length;
          textarea.selectionStart = newCursorPos;
          textarea.selectionEnd = newCursorPos;
        }, 0);
      } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl mx-auto px-4"
    >
      <CyberpunkPanel className="h-[600px] shadow-2xl flex flex-col">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyberpunk-surface-dark via-cyberpunk-surface to-cyberpunk-surface-dark border-b border-cyberpunk-border">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-cyberpunk-neon-magenta animate-pulse"></div>
            <GlitchText className="text-cyberpunk-neon-magenta font-mono text-sm font-bold">
              NEXUS_EDIT.EXE
            </GlitchText>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onMinimize}
              className="w-6 h-6 rounded bg-cyberpunk-surface-dark hover:bg-yellow-500 transition-colors flex items-center justify-center"
            >
              <Minus size={12} className="text-cyberpunk-text" />
            </button>
            <button
              onClick={onClose}
              className="w-6 h-6 rounded bg-cyberpunk-surface-dark hover:bg-red-500 transition-colors flex items-center justify-center"
            >
              <X size={12} className="text-cyberpunk-text" />
            </button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-cyberpunk-surface-dark border-b border-cyberpunk-border">
          <div className="flex items-center space-x-4">
            <button
              onClick={createNewFile}
              className="flex items-center space-x-2 px-3 py-1 rounded cyberpunk-button text-xs"
            >
              <FileText size={14} />
              <span>New</span>
            </button>
            <button
              onClick={saveFile}
              className="flex items-center space-x-2 px-3 py-1 rounded cyberpunk-button text-xs"
            >
              <Save size={14} />
              <span>Save</span>
            </button>
            <div className="h-4 w-px bg-cyberpunk-border"></div>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 px-3 py-1 rounded cyberpunk-button text-xs"
            >
              <Copy size={14} />
              <span>Copy</span>
            </button>
            <button
              onClick={cutToClipboard}
              className="flex items-center space-x-2 px-3 py-1 rounded cyberpunk-button text-xs"
            >
              <Scissors size={14} />
              <span>Cut</span>
            </button>
            <button
              onClick={pasteFromClipboard}
              className="flex items-center space-x-2 px-3 py-1 rounded cyberpunk-button text-xs"
            >
              <Clipboard size={14} />
              <span>Paste</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-cyberpunk-text-dim">Size:</span>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-cyberpunk-surface border border-cyberpunk-border rounded px-2 py-1 text-xs text-cyberpunk-text"
              >
                <option value={12}>12px</option>
                <option value={14}>14px</option>
                <option value={16}>16px</option>
                <option value={18}>18px</option>
                <option value={20}>20px</option>
              </select>
            </div>
          </div>
        </div>

        {/* File Tabs */}
        <div className="flex items-center bg-cyberpunk-surface-dark border-b border-cyberpunk-border overflow-x-auto">
          {files.map(file => (
            <div
              key={file.id}
              className={`flex items-center space-x-2 px-4 py-2 border-r border-cyberpunk-border cursor-pointer transition-colors ${
                file.id === activeFileId
                  ? 'bg-cyberpunk-surface text-cyberpunk-electric-blue'
                  : 'hover:bg-cyberpunk-surface text-cyberpunk-text-dim'
              }`}
              onClick={() => setActiveFileId(file.id)}
            >
              <span className="text-xs font-mono whitespace-nowrap">
                {file.name}{file.modified ? ' •' : ''}
              </span>
              {files.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeFile(file.id);
                  }}
                  className="text-cyberpunk-text-dim hover:text-red-400 transition-colors"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={activeFile?.content || ''}
              onChange={(e) => updateFileContent(e.target.value)}
              className="w-full h-full p-4 bg-cyberpunk-bg text-cyberpunk-text font-mono resize-none outline-none border-none"
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.5' }}
              placeholder="Start typing your code or text..."
              spellCheck={false}
            />
            
            {/* Scan Lines Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="h-full w-full opacity-10">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-px w-full bg-cyberpunk-electric-blue mb-8"
                    style={{ 
                      animationDelay: `${i * 0.1}s`,
                      animation: 'scan-line 3s linear infinite'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-cyberpunk-surface-dark border-t border-cyberpunk-border text-xs text-cyberpunk-text-dim">
          <div className="flex items-center space-x-4">
            <span>Lines: {lineCount}</span>
            <span>Words: {wordCount}</span>
            <span>Characters: {charCount}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>UTF-8</span>
            <span className="text-cyberpunk-electric-blue">READY</span>
          </div>
        </div>

        {/* Cyberpunk Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyberpunk-neon-magenta to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyberpunk-electric-blue to-transparent opacity-50"></div>
        </div>
      </CyberpunkPanel>
    </motion.div>
  );
}