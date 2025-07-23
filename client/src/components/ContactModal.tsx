import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '../hooks/use-toast';
import { apiRequest } from '../lib/queryClient';
import { Language } from '../hooks/useLanguage';

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
  const { toast } = useToast();

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
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
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
            onClick={onClose}
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
