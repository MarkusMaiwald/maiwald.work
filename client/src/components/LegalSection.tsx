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
        title: "Privacyverklaring",
        content: [
          "Laatst bijgewerkt: 23 juli 2025",
          "",
          "Wij hechten waarde aan uw privacy. In deze privacyverklaring leggen we uit welke persoonsgegevens wij verwerken wanneer u onze website bezoekt en gebruikt.",
          "",
          "1. Geen Gebruik van Cookies",
          "Deze website maakt geen gebruik van cookies of vergelijkbare trackingtechnologieën.",
          "",
          "2. Verwerking van Gegevens in Serverlogbestanden",
          "",
          "Welke gegevens verwerken wij?",
          "Onze webhostingprovider verzamelt en slaat automatisch informatie op in zogenaamde serverlogbestanden, die uw browser automatisch aan ons doorgeeft. Dit omvat het IP-adres van de bezoeker.",
          "",
          "Waarom verwerken wij deze gegevens (rechtsgrond)?",
          "De verwerking van deze gegevens is noodzakelijk voor de technische werking van de website. De rechtsgrondslag hiervoor is ons gerechtvaardigd belang bij het garanderen van de veiligheid en functionaliteit van onze website, in overeenstemming met art. 6, lid 1, onder f) van de Algemene Verordening Gegevensbescherming (AVG).",
          "",
          "Hoe lang bewaren wij deze gegevens?",
          "De IP-adressen in de serverlogbestanden worden na 7 dagen automatisch geanonimiseerd of verwijderd.",
          "",
          "3. Contactformulier",
          "",
          "Welke gegevens verwerken wij?",
          "Wanneer u ons contactformulier gebruikt, verwerken wij de gegevens die u vrijwillig invult, zoals uw naam, e-mailadres en de inhoud van uw bericht.",
          "",
          "Waarom verwerken wij deze gegevens (rechtsgrond)?",
          "De verwerking van deze gegevens is noodzakelijk om uw aanvraag te kunnen beantwoorden. De rechtsgrondslag hiervoor is de uitvoering van precontractuele maatregelen op uw verzoek (art. 6, lid 1, onder b) van de AVG) en/of ons gerechtvaardigd belang om efficiënt met u te kunnen communiceren (art. 6, lid 1, onder f) van de AVG).",
          "",
          "Hoe lang bewaren wij deze gegevens?",
          "De via het contactformulier verzonden gegevens worden bewaard totdat uw aanvraag volledig is afgehandeld. Daarna worden ze verwijderd, tenzij er een wettelijke bewaarplicht van toepassing is (bijvoorbeeld voor zakelijke correspondentie die onder fiscale bewaartermijnen valt).",
          "",
          "Gegevensoverdracht",
          "Om de veiligheid van uw gegevens tijdens de overdracht te beschermen, wordt de verbinding met deze website versleuteld middels SSL/TLS.",
          "",
          "4. Uw Rechten",
          "U heeft het recht op inzage, rectificatie, verwijdering van uw gegevens, beperking van de verwerking en het recht op bezwaar tegen de verwerking. Om gebruik te maken van uw rechten kunt u contact met ons opnemen.",
          "",
          "5. Contactpersoon voor Gegevensbescherming",
          "Voor vragen over gegevensbescherming kunt u contact opnemen met:",
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
          "Wir legen Wert auf Ihren Datenschutz. In dieser Datenschutzerklärung erläutern wir, welche personenbezogenen Daten wir verarbeiten, wenn Sie unsere Website besuchen und nutzen.",
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
          "3. Kontaktformular",
          "",
          "Welche Daten verarbeiten wir?",
          "Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die Daten, die Sie freiwillig eingeben, wie Ihren Namen, Ihre E-Mail-Adresse und den Inhalt Ihrer Nachricht.",
          "",
          "Warum verarbeiten wir diese Daten (Rechtsgrundlage)?",
          "Die Verarbeitung dieser Daten ist erforderlich, um Ihre Anfrage beantworten zu können. Die Rechtsgrundlage hierfür ist die Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b DSGVO) und/oder unser berechtigtes Interesse an einer effizienten Kommunikation mit Ihnen (Art. 6 Abs. 1 lit. f DSGVO).",
          "",
          "Wie lange speichern wir diese Daten?",
          "Die über das Kontaktformular übermittelten Daten werden gespeichert, bis Ihre Anfrage vollständig bearbeitet ist. Danach werden sie gelöscht, es sei denn, es besteht eine gesetzliche Aufbewahrungspflicht (z.B. für Geschäftskorrespondenz unter steuerlichen Aufbewahrungsfristen).",
          "",
          "Datenübertragung",
          "Um die Sicherheit Ihrer Daten während der Übertragung zu schützen, wird die Verbindung zu dieser Website mittels SSL/TLS verschlüsselt.",
          "",
          "4. Ihre Rechte",
          "Sie haben das Recht auf Auskunft, Berichtigung, Löschung Ihrer Daten, Einschränkung der Verarbeitung und das Recht auf Widerspruch gegen die Verarbeitung. Um Ihre Rechte auszuüben, können Sie Kontakt mit uns aufnehmen.",
          "",
          "5. Ansprechpartner für Datenschutz",
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
          {currentLanguage === 'EN'
            ? 'Legal entities, disclosure, and privacy. The brand is Markus Maiwald; these are just the containers.'
            : 'Rechtsträger, Pflichtangaben und Datenschutz. Die Marke ist Markus Maiwald; das hier sind nur die Hüllen.'}
        </div>
      </div>

      {/* Entities banner – demoted vehicles */}
      <CyberpunkPanel className="p-6 mb-8">
        <GlitchText className="text-xl font-bold cyberpunk-heading mb-4">
          {currentLanguage === 'EN' ? 'ENTITIES' : 'RECHTSTRÄGER'}
        </GlitchText>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-sm">
          <div>
            <div className="text-cyberpunk-electric-blue font-bold mb-1">Maiwald Enterprises B.V.</div>
            <div className="text-cyberpunk-text-dim">
              {currentLanguage === 'EN'
                ? 'Dutch holding. Contracts, invoicing, IP.'
                : 'Niederländische Holding. Verträge, Rechnungsstellung, IP.'}
            </div>
          </div>
          <div>
            <div className="text-cyberpunk-neon-magenta font-bold mb-1">BC2 IP GmbH</div>
            <div className="text-cyberpunk-text-dim">
              {currentLanguage === 'EN'
                ? 'German IP holding and research vehicle.'
                : 'Deutsche IP-Holding und Forschungsvehikel.'}
            </div>
          </div>
          <div>
            <div className="text-cyberpunk-acid-green font-bold mb-1">SSSF</div>
            <div className="text-cyberpunk-text-dim">
              {currentLanguage === 'EN'
                ? 'Sovereign Systems Foundation (in formation).'
                : 'Sovereign Systems Foundation (in Gründung).'}
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs font-mono text-cyberpunk-text-dim">
          {currentLanguage === 'EN'
            ? 'These are legal vehicles. They do not represent my identity; see: cat about.'
            : 'Das sind juristische Vehikel. Sie repräsentieren nicht meine Identität; siehe: cat about.'}
        </div>
      </CyberpunkPanel>

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