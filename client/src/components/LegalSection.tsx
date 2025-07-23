import { GlitchText, CyberpunkPanel } from './CyberpunkEffects';
import { Language } from '../hooks/useLanguage';

interface LegalSectionProps {
  currentLanguage: Language;
}

export function LegalSection({ currentLanguage }: LegalSectionProps) {
  const legalContent = {
    en: {
      title: "Legal Information",
      informatieplicht: {
        title: "Informatieplicht (Legal Disclosure)",
        content: [
          "Name und Anschrift:",
          "Maiwald Enterprises BV",
          "Registered Address: [Company Address]",
          "Netherlands",
          "",
          "Kontaktinformationen:",
          "E-Mail: markus@maiwald.work",
          "Telefon: [Phone Number]",
          "",
          "Handelsregisternummer:",
          "KVK-Nummer: [Chamber of Commerce Number]",
          "",
          "Umsatzsteuer-Identifikationsnummer:",
          "BTW-Identificatienummer: [VAT ID Number]"
        ]
      },
      privacyverklaring: {
        title: "Privacyverklaring (Privacy Policy)",
        content: [
          "Data Processing Disclosure:",
          "",
          "DASS (What we collect):",
          "We and our hosting provider process IP addresses in server log files for technical operation of this website.",
          "",
          "WARUM (Why we collect it):",
          "The legal basis for this processing is our legitimate interest in ensuring the security and functionality of our website, in accordance with Art. 6 para. 1 lit. f GDPR.",
          "",
          "WIE LANGE (How long we store it):",
          "IP addresses in server logs are automatically deleted after [retention period] days.",
          "",
          "Contact for Privacy Matters:",
          "For questions regarding data protection, please contact: markus@maiwald.work",
          "",
          "This minimal data processing is necessary for the technical operation of any website and represents the absolute minimum required by law."
        ]
      }
    },
    de: {
      title: "Rechtliche Informationen",
      informatieplicht: {
        title: "Informatieplicht",
        content: [
          "Name und Anschrift:",
          "Maiwald Enterprises BV",
          "Firmenadresse: [Firmenadresse]",
          "Niederlande",
          "",
          "Kontaktinformationen:",
          "E-Mail: markus@maiwald.work",
          "Telefon: [Telefonnummer]",
          "",
          "Handelsregisternummer:",
          "KVK-Nummer: [Kamer van Koophandel Nummer]",
          "",
          "Umsatzsteuer-Identifikationsnummer:",
          "BTW-Identificatienummer: [Umsatzsteuer-ID]"
        ]
      },
      privacyverklaring: {
        title: "Privacyverklaring (Datenschutzerklärung)",
        content: [
          "Offenlegung der Datenverarbeitung:",
          "",
          "DASS (Was wir sammeln):",
          "Wir bzw. unser Hoster verarbeiten IP-Adressen in Server-Logfiles für den technischen Betrieb dieser Webseite.",
          "",
          "WARUM (Warum wir es sammeln):",
          "Rechtsgrundlage ist unser berechtigtes Interesse an der Sicherheit und Funktionsfähigkeit der Webseite, Art. 6 Abs. 1 lit. f DSGVO.",
          "",
          "WIE LANGE (Wie lange wir es speichern):",
          "IP-Adressen in Server-Logs werden nach [Aufbewahrungszeitraum] Tagen automatisch gelöscht.",
          "",
          "Kontakt für Datenschutzfragen:",
          "Bei Fragen zum Datenschutz wenden Sie sich bitte an: markus@maiwald.work",
          "",
          "Diese minimale Datenverarbeitung ist für den technischen Betrieb jeder Website notwendig und stellt das gesetzlich vorgeschriebene Minimum dar."
        ]
      }
    }
  };

  const content = legalContent[currentLanguage as keyof typeof legalContent];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <GlitchText className="text-5xl font-bold cyberpunk-heading mb-6" enableHover={true}>
          {content.title}
        </GlitchText>
        <div className="text-cyberpunk-text-dim text-lg">
          Legal disclosure and privacy information required by Dutch and EU law
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informatieplicht Section */}
        <CyberpunkPanel className="p-8">
          <GlitchText className="text-2xl font-bold cyberpunk-heading mb-6">
            {content.informatieplicht.title}
          </GlitchText>
          <div className="space-y-3">
            {content.informatieplicht.content.map((line: string, index: number) => (
              <div 
                key={index} 
                className={`font-mono ${
                  line === '' ? 'h-2' : 
                  line.endsWith(':') ? 'text-cyberpunk-electric-blue font-bold' : 
                  'text-cyberpunk-text'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </CyberpunkPanel>

        {/* Privacyverklaring Section */}
        <CyberpunkPanel className="p-8">
          <GlitchText className="text-2xl font-bold cyberpunk-heading mb-6">
            {content.privacyverklaring.title}
          </GlitchText>
          <div className="space-y-3">
            {content.privacyverklaring.content.map((line: string, index: number) => (
              <div 
                key={index} 
                className={`font-mono text-sm ${
                  line === '' ? 'h-2' : 
                  line.endsWith(':') ? 'text-cyberpunk-electric-blue font-bold' : 
                  'text-cyberpunk-text'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </CyberpunkPanel>
      </div>

      <div className="mt-12 text-center">
        <CyberpunkPanel className="p-6 inline-block">
          <div className="text-cyberpunk-acid-green font-mono text-sm">
            <div className="animate-pulse">● SYSTEM STATUS: COMPLIANT</div>
            <div className="mt-2 text-cyberpunk-text-dim">
              Last Updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </CyberpunkPanel>
      </div>
    </div>
  );
}