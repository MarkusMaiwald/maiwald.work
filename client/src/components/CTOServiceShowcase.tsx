import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, Clock, Shield, Zap, Target } from 'lucide-react';
import markusPhoto from '@assets/Markus_Maiwald_2iextb2iextb2iex_1756293542998.png';

interface CTOServiceShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CTOServiceShowcase: React.FC<CTOServiceShowcaseProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return <></>;

  const benefits = React.useMemo(() => [
    {
      icon: Target,
      title: 'Personal Task Board',
      description: 'Add and track your active, queued, and completed tasks with utmost convenience.'
    },
    {
      icon: Shield,
      title: 'Keep 100% of Equity',
      description: 'No need to part with equity or stock options, unless you really want to.'
    },
    {
      icon: Clock,
      title: 'Fixed & Predictable Pricing',
      description: 'No surprises! Extend your runway with a fixed monthly price.'
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Get tasks completed in just a few days on average. We iterate until satisfied.'
    },
    {
      icon: Users,
      title: 'Invite Everyone',
      description: 'Add your team to submit requests and track progress collaboratively.'
    },
    {
      icon: CheckCircle,
      title: 'Full IP Ownership',
      description: 'You own 100% of source materials and intellectual property.'
    }
  ], []);

  // Handle ESC key
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isOpen, onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto cto-modal"
      onClick={(e) => {
        // Close on backdrop click, but not on modal content
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto border border-cyan-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-b border-cyan-500/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-xl"
          >
            ×
          </button>
          
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img 
                src={markusPhoto} 
                alt="Markus Maiwald - Strategic Technology Leader"
                className="w-32 h-32 lg:w-48 lg:h-48 rounded-full border-4 border-cyan-500/50 shadow-lg"
              />
            </div>
            
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                CTO/CIO/CSO as a Service
              </h1>
              <div className="text-2xl lg:text-3xl text-cyan-400 font-semibold mb-2">
                €1,600/month
              </div>
              <div className="text-gray-300 text-lg">
                20 hours guaranteed | Fixed & predictable pricing
              </div>
              <div className="text-gray-400 mt-2">
                Strategic Technology Leadership for Founders
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-12">
          
          {/* How it Works */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">How it Works - A Better Workflow</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20">
                <h3 className="text-xl font-semibold text-cyan-400 mb-3">Essential MVPs for Founders</h3>
                <p className="text-gray-300">
                  No more over-engineered products. We'll help you build an effective MVP and iterate to product-market fit, reducing capital and time risk.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-lg border border-purple-500/20">
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Professional CTO Leadership</h3>
                <p className="text-gray-300">
                  Avoid paying for unnecessary agency members or wasting time managing freelancers. We'll help you scale your team when it's time.
                </p>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-lg border border-green-500/20">
                <h3 className="text-xl font-semibold text-green-400 mb-3">You're in Control</h3>
                <p className="text-gray-300">
                  Effortlessly manage your project board asynchronously. Keep track of your active, queued, and completed tasks with utmost convenience.
                </p>
              </div>
            </div>
          </section>

          {/* Membership Benefits */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Membership Benefits - So Good You'll Never Need to Look Elsewhere
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-colors"
                >
                  <benefit.icon className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Core Services */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-6">Core Services Included</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Strategic technology roadmapping and architecture decisions',
                'MVP development and product-market fit iteration',
                'Team scaling and technical hiring guidance',
                'Code reviews and technical quality assurance',
                'Infrastructure planning and cloud architecture',
                'Security and compliance strategic planning',
                'Vendor evaluation and technology stack decisions',
                'Technical due diligence and risk assessment'
              ].map((service, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{service}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-gradient-to-r from-cyan-600/20 to-purple-600/20 p-8 rounded-lg border border-cyan-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-6">
              Transform your startup with strategic technology leadership that scales with you.
            </p>
            <button
              onClick={() => {
                // This would trigger the contact modal
                onClose();
                // Add contact modal trigger here
              }}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-400 hover:to-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Contact: markus@maiwald.work
            </button>
          </section>
        </div>
      </motion.div>
    </div>
  );
};