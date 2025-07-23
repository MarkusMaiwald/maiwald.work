import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../hooks/use-toast';
import { apiRequest } from '../lib/queryClient';
import { Language } from '../hooks/useLanguage';
import { MatrixBackground, CyberpunkAudio } from './CyberpunkEffects';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
}

export function ContactModal({ isOpen, onClose, currentLanguage }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isOpen) {
        setCursorPosition({ x: event.clientX, y: event.clientY });
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('mousemove', handleMouseMove);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [isOpen, onClose]);

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: currentLanguage === 'EN' ? 'Success' : 'Erfolg',
        description: currentLanguage === 'EN' 
          ? 'Your message has been sent successfully!' 
          : 'Ihre Nachricht wurde erfolgreich gesendet!'
      });
      setFormData({ name: '', email: '', message: '' });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: currentLanguage === 'EN' 
          ? 'Failed to send message. Please try again.' 
          : 'Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
        variant: 'destructive'
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  const labels = {
    EN: {
      title: 'Get in Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message'
    },
    DE: {
      title: 'Kontakt aufnehmen',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Nachricht senden'
    }
  };

  const currentLabels = labels[currentLanguage];

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50" 
      style={{ 
        background: `
          linear-gradient(135deg, #000514 0%, #001122 50%, #000f1e 100%),
          radial-gradient(ellipse at center, rgba(0, 212, 255, 0.2) 0%, transparent 70%)
        `,
        cursor: 'none',
        backdropFilter: 'blur(5px)'
      }}
    >
      {/* Custom cyberpunk cursor for modal */}
      <div
        className="fixed pointer-events-none z-[60]"
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
          width: '24px',
          height: '24px',
          border: '3px solid #00d4ff',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 212, 255, 0.3)',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.8), inset 0 0 10px rgba(0, 212, 255, 0.5)',
          transition: 'none'
        }}
      />
      
      {/* Real Matrix Background - Same as homepage */}
      <div className="absolute inset-0 opacity-60">
        <MatrixBackground />
      </div>
      
      <div className="cyberpunk-panel w-full max-w-md mx-4 relative overflow-hidden">
        {/* Cyberpunk Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyberpunk-border bg-cyberpunk-surface-light">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-cyberpunk-electric-blue rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cyberpunk-neon-cyan rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-2 h-2 bg-cyberpunk-acid-green rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          <div className="text-sm font-mono font-bold text-cyberpunk-electric-blue">CONTACT.EXE</div>
          <button
            onMouseEnter={() => CyberpunkAudio.playHoverClick()}
            onClick={() => {
              CyberpunkAudio.playButtonClick();
              onClose();
            }}
            className="text-cyberpunk-text-dim hover:text-cyberpunk-neon-magenta transition-colors font-mono"
          >
            [X]
          </button>
        </div>
        
        {/* Scan line effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="scan-line"></div>
        </div>
        
        <div className="p-6 bg-cyberpunk-bg relative z-10">
          <h3 className="text-lg font-bold mb-6 text-cyberpunk-electric-blue font-mono cyberpunk-heading">
            {currentLabels.title.toUpperCase()}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-mono font-bold text-cyberpunk-text mb-2">
                &gt; {currentLabels.name.toUpperCase()}
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-cyberpunk-surface-dark border border-cyberpunk-border rounded text-cyberpunk-text font-mono focus:outline-none focus:border-cyberpunk-electric-blue focus:shadow-lg focus:shadow-cyberpunk-electric-blue/20 transition-all"
                placeholder="ENTER_NAME..."
              />
            </div>
            <div>
              <label className="block text-sm font-mono font-bold text-cyberpunk-text mb-2">
                &gt; {currentLabels.email.toUpperCase()}
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-cyberpunk-surface-dark border border-cyberpunk-border rounded text-cyberpunk-text font-mono focus:outline-none focus:border-cyberpunk-electric-blue focus:shadow-lg focus:shadow-cyberpunk-electric-blue/20 transition-all"
                placeholder="USER@DOMAIN.COM"
              />
            </div>
            <div>
              <label className="block text-sm font-mono font-bold text-cyberpunk-text mb-2">
                &gt; {currentLabels.message.toUpperCase()}
              </label>
              <textarea 
                rows={4} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-cyberpunk-surface-dark border border-cyberpunk-border rounded text-cyberpunk-text font-mono focus:outline-none focus:border-cyberpunk-electric-blue focus:shadow-lg focus:shadow-cyberpunk-electric-blue/20 transition-all resize-none"
                placeholder="TRANSMIT_MESSAGE..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={contactMutation.isPending}
              onMouseEnter={() => !contactMutation.isPending && CyberpunkAudio.playHoverClick()}
              onClick={() => !contactMutation.isPending && CyberpunkAudio.playButtonClick()}
              className="w-full cyberpunk-button py-3 px-6 rounded font-mono font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {contactMutation.isPending 
                ? (currentLanguage === 'EN' ? '[ TRANSMITTING... ]' : '[ ÜBERTRAGUNG... ]') 
                : `[ ${currentLabels.send.toUpperCase()} ]`
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
