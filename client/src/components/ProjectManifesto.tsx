import { useState } from 'react';
import { CyberpunkPanel, GlitchText, TypewriterEffect, DataVisualization } from './CyberpunkEffects';
import { Language } from '../hooks/useLanguage';

interface ProjectManifestoProps {
  currentLanguage: Language;
}

export function ProjectManifesto({ currentLanguage }: ProjectManifestoProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const manifestoContent = {
    en: {
      title: "THE MAIWALD MANIFESTO",
      subtitle: "Building the Infrastructure of Tomorrow",
      sections: [
        {
          title: "STRATEGIC VISION",
          content: "Every line of code, every architecture decision, every technology choice serves a greater purpose: creating robust, scalable infrastructure that powers the digital economy."
        },
        {
          title: "TECHNICAL PHILOSOPHY", 
          content: "We don't just build applications—we architect ecosystems. Our approach combines cutting-edge blockchain technology, cloud-native architectures, and robust security frameworks."
        },
        {
          title: "INNOVATION PIPELINE",
          content: "From custom operating systems to decentralized identity platforms, our R&D portfolio demonstrates deep technical capabilities and forward-thinking innovation."
        }
      ]
    },
    de: {
      title: "DAS MAIWALD MANIFESTO",
      subtitle: "Die Infrastruktur von Morgen bauen",
      sections: [
        {
          title: "STRATEGISCHE VISION",
          content: "Jede Codezeile, jede Architekturentscheidung, jede Technologiewahl dient einem höheren Zweck: robuste, skalierbare Infrastruktur zu schaffen, die die digitale Wirtschaft antreibt."
        },
        {
          title: "TECHNISCHE PHILOSOPHIE",
          content: "Wir bauen nicht nur Anwendungen—wir entwerfen Ökosysteme. Unser Ansatz kombiniert modernste Blockchain-Technologie, Cloud-native Architekturen und robuste Sicherheits-Frameworks."
        },
        {
          title: "INNOVATION PIPELINE", 
          content: "Von benutzerdefinierten Betriebssystemen bis hin zu dezentralen Identitätsplattformen demonstriert unser F&E-Portfolio tiefe technische Fähigkeiten und zukunftsorientierte Innovation."
        }
      ]
    }
  };

  const content = manifestoContent[currentLanguage] || manifestoContent.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <CyberpunkPanel className="max-w-4xl max-h-[90vh] overflow-y-auto p-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center border-b border-cyberpunk-border pb-6">
            <GlitchText className="text-4xl font-bold cyberpunk-heading mb-2">
              {content.title}
            </GlitchText>
            <TypewriterEffect 
              text={content.subtitle}
              className="text-lg cyberpunk-subheading"
              speed={40}
            />
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {content.sections.map((section: any, index: number) => (
              <DataVisualization key={index} className="p-4">
                <h3 className="text-xl font-bold text-cyberpunk-electric-blue mb-3 text-glow">
                  {section.title}
                </h3>
                <p className="text-cyberpunk-text leading-relaxed">
                  {section.content}
                </p>
              </DataVisualization>
            ))}
          </div>

          {/* Interactive Timeline */}
          <div className="mt-8 p-6 bg-cyberpunk-surface-dark rounded-lg border border-cyberpunk-border">
            <h3 className="text-xl font-bold text-cyberpunk-neon-magenta mb-4 text-glow">
              TECHNICAL MILESTONES
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-cyberpunk-acid-green rounded-full animate-pulse"></div>
                <span className="text-cyberpunk-text">Custom OS Development - Core kernel implementation</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-cyberpunk-electric-blue rounded-full animate-pulse"></div>
                <span className="text-cyberpunk-text">Blockchain Integration - SSI/DID protocols</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-cyberpunk-neon-magenta rounded-full animate-pulse"></div>
                <span className="text-cyberpunk-text">TTRPG Platform - Decentralized gaming ecosystem</span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="text-center pt-6">
            <button 
              onClick={() => setIsExpanded(false)}
              className="cyberpunk-button px-8 py-3 rounded-lg"
            >
              CLOSE MANIFESTO
            </button>
          </div>
        </div>
      </CyberpunkPanel>
    </div>
  );
}