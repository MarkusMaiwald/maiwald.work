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
          "Maiwald Enterprises B.V.",
          "M. Maiwald",
          "Lemiers-Rijksweg 104C",
          "6295AR Lemiers",
          "Nederland",
          "",
          "Kontaktinformationen:",
          "E-Mail: markus@maiwald.work",
          "Telefon: +31634026717",
          "Website: maiwald.work",
          "",
          "Handelsregisternummer:",
          "KVK-Nummer: 78035902",
          "",
          "Umsatzsteuer-Identifikationsnummer:",
          "BTW-Identificatienummer: NL861240716B01"
        ]
      },
      privacyverklaring: {
        title: "Privacy Policy",
        content: [
          "Last updated: July 23, 2025",
          "",
          "We value your privacy. This privacy policy explains which personal data we process in the most minimal way.",
          "",
          "1. No Use of Cookies",
          "This website does not use cookies or similar tracking technologies.",
          "",
          "2. Processing of Data in Server Log Files",
          "",
          "What data do we process?",
          "Our web hosting provider automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. This includes the visitor's IP address.",
          "",
          "Why do we process this data (legal basis)?",
          "The processing of this data is necessary for the technical operation of the website. The legal basis for this is our legitimate interest in ensuring the security and functionality of our website, in accordance with Art. 6, para. 1, lit. f) of the General Data Protection Regulation (GDPR).",
          "",
          "How long do we retain this data?",
          "The IP addresses in the server log files are automatically anonymized or deleted after 7 days.",
          "",
          "3. Your Rights",
          "You have the right to access, rectify, delete your data, restrict processing, and the right to object to processing based on our legitimate interest.",
          "",
          "4. Contact Person for Data Protection",
          "For questions about data protection, you can contact:",
          "",
          "Markus Maiwald",
          "markus@maiwald.work"
        ]
      }
    },
    de: {
      title: "Rechtliche Informationen",
      informatieplicht: {
        title: "Informatieplicht",
        content: [
          "Name und Anschrift:",
          "Maiwald Enterprises B.V.",
          "M. Maiwald",
          "Lemiers-Rijksweg 104C",
          "6295AR Lemiers",
          "Niederlande",
          "",
          "Kontaktinformationen:",
          "E-Mail: markus@maiwald.work",
          "Telefon: +31634026717",
          "Website: maiwald.work",
          "",
          "Handelsregisternummer:",
          "KVK-Nummer: 78035902",
          "",
          "Umsatzsteuer-Identifikationsnummer:",
          "BTW-Identificatienummer: NL861240716B01"
        ]
      },
      privacyverklaring: {
        title: "Privacyverklaring (Datenschutzerklärung)",
        content: [
          "Zuletzt aktualisiert: 23. Juli 2025",
          "",
          "Wir legen Wert auf Ihren Datenschutz. In dieser Datenschutzerklärung erläutern wir, welche personenbezogenen Daten wir auf minimale Weise verarbeiten.",
          "",
          "1. Keine Verwendung von Cookies",
          "Diese Website verwendet keine Cookies oder ähnliche Tracking-Technologien.",
          "",
          "2. Verarbeitung von Daten in Server-Logdateien",
          "",
          "Welche Daten verarbeiten wir?",
          "Unser Webhosting-Anbieter sammelt und speichert automatisch Informationen in sogenannten Server-Logdateien, die Ihr Browser automatisch an uns übermittelt. Dies umfasst die IP-Adresse des Besuchers.",
          "",
          "Warum verarbeiten wir diese Daten (Rechtsgrundlage)?",
          "Die Verarbeitung dieser Daten ist für den technischen Betrieb der Website erforderlich. Die Rechtsgrundlage hierfür ist unser berechtigtes Interesse an der Gewährleistung der Sicherheit und Funktionalität unserer Website gemäß Art. 6 Abs. 1 lit. f DSGVO.",
          "",
          "Wie lange speichern wir diese Daten?",
          "Die IP-Adressen in den Server-Logdateien werden nach 7 Tagen automatisch anonymisiert oder gelöscht.",
          "",
          "3. Ihre Rechte",
          "Sie haben das Recht auf Auskunft, Berichtigung, Löschung Ihrer Daten, Einschränkung der Verarbeitung und das Recht auf Widerspruch gegen die Verarbeitung aufgrund unseres berechtigten Interesses.",
          "",
          "4. Ansprechpartner für Datenschutz",
          "Für Fragen zum Datenschutz können Sie sich wenden an:",
          "",
          "Markus Maiwald",
          "markus@maiwald.work"
        ]
      }
    }
  };

  const langKey = currentLanguage.toLowerCase() as 'en' | 'de';
  const content = legalContent[langKey] || legalContent.en;

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