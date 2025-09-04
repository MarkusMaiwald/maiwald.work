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
      title: "MANIFESTO",
      subtitle: "Architect for Autonomy",
      sections: [
        {
          title: "Our Premise: The Default is Dependency",
          content: "The modern digital landscape is built on a lie: the promise of empowerment through platforms you don't own. This is not empowerment; it's a leash. Your data, your operations, your digital existence are tethered to centralized systems that can—and will—fail, change rules, or be compromised.\n\nWe don't see this as an inconvenience. We see it as a critical design flaw and a strategic liability. Dependency is a bug, not a feature."
        },
        {
          title: "Our Principle: Architect for Autonomy", 
          content: "Our response is not to build a better cage, but to engineer its irrelevance. We build systems where sovereignty is the core protocol.\n\nWe wield technology—blockchain, cryptography, decentralized infrastructure—not as ends in themselves, but as the raw physics for a new architecture. An architecture where trust is embedded in code, not in policies. Where resilience is a mathematical certainty, not a service-level agreement.\n\nThe goal is ruthlessly simple: to give you unconditional control over the systems you depend on."
        },
        {
          title: "Our Proof: Code is Consequence",
          content: "Philosophy is cheap. Proof is in the running code and the unbreakable infrastructure.\n\nWe don't sell visions or roadmaps; we deliver operational systems. From immutable operating systems for hostile environments to self-sovereign identities that cannot be revoked, our work is the tangible application of our principles. We build digital fortresses and sovereign tools for individuals and businesses who understand that in the coming economy, autonomy is the ultimate asset.\n\nWe build for those who refuse to be tools themselves."
        }
      ]
    },
    de: {
      title: "MANIFESTO",
      subtitle: "Architektur für Autonomie",
      sections: [
        {
          title: "Unsere Prämisse: Abhängigkeit ist Standard",
          content: "Die moderne digitale Landschaft basiert auf einer Lüge: dem Versprechen der Ermächtigung durch Plattformen, die Ihnen nicht gehören. Das ist keine Ermächtigung; es ist eine Leine. Ihre Daten, Ihre Operationen, Ihre digitale Existenz sind an zentralisierte Systeme gebunden, die versagen, Regeln ändern oder kompromittiert werden können—und werden.\n\nWir sehen das nicht als Unannehmlichkeit. Wir sehen es als kritischen Design-Fehler und strategisches Risiko. Abhängigkeit ist ein Bug, kein Feature."
        },
        {
          title: "Unser Prinzip: Architektur für Autonomie",
          content: "Unsere Antwort ist nicht, einen besseren Käfig zu bauen, sondern seine Irrelevanz zu entwickeln. Wir bauen Systeme, in denen Souveränität das Kernprotokoll ist.\n\nWir nutzen Technologie—Blockchain, Kryptographie, dezentrale Infrastruktur—nicht als Selbstzweck, sondern als rohe Physik für eine neue Architektur. Eine Architektur, in der Vertrauen in Code eingebettet ist, nicht in Richtlinien. Wo Widerstandsfähigkeit eine mathematische Gewissheit ist, kein Service-Level-Agreement.\n\nDas Ziel ist gnadenlos einfach: Ihnen bedingungslose Kontrolle über die Systeme zu geben, von denen Sie abhängen."
        },
        {
          title: "Unser Beweis: Code ist Konsequenz",
          content: "Philosophie ist billig. Der Beweis liegt im laufenden Code und der unzerbrechlichen Infrastruktur.\n\nWir verkaufen keine Visionen oder Roadmaps; wir liefern operative Systeme. Von unveränderlichen Betriebssystemen für feindliche Umgebungen bis hin zu selbst-souveränen Identitäten, die nicht widerrufen werden können—unsere Arbeit ist die greifbare Anwendung unserer Prinzipien. Wir bauen digitale Festungen und souveräne Werkzeuge für Individuen und Unternehmen, die verstehen, dass in der kommenden Wirtschaft Autonomie das ultimative Asset ist.\n\nWir bauen für diejenigen, die sich weigern, selbst Werkzeuge zu sein."
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