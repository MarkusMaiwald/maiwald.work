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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-fade-in">
        <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 bg-[var(--mac-red)] rounded-full cursor-pointer" 
              onClick={onClose}
            ></div>
            <div className="w-3 h-3 bg-[var(--mac-yellow)] rounded-full"></div>
            <div className="w-3 h-3 bg-[var(--mac-green)] rounded-full"></div>
          </div>
          <div className="text-sm font-medium text-gray-700">Contact</div>
          <div className="w-16"></div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4">{currentLabels.title}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentLabels.name}
              </label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--mac-blue)]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentLabels.email}
              </label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--mac-blue)]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {currentLabels.message}
              </label>
              <textarea 
                rows={4} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--mac-blue)]"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={contactMutation.isPending}
              className="w-full bg-[var(--mac-blue)] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {contactMutation.isPending 
                ? (currentLanguage === 'EN' ? 'Sending...' : 'Wird gesendet...') 
                : currentLabels.send
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
