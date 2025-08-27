export interface ContentData {
  [key: string]: {
    EN: string;
    DE: string;
  };
}

export const content: ContentData = {
  welcome: {
    EN: "Markus Maiwald",
    DE: "Markus Maiwald"
  },
  subtitle: {
    EN: "I build stuff",
    DE: "Ich baue Zeug"
  },
  prompt: {
    EN: "Type in 'help', to start.",
    DE: "Geben Sie 'help' ein, um zu beginnen."
  },
  help: {
    EN: `Available commands:
• help - Show this help message
• list - List available portfolio sections
• clear - Clear the terminal screen
• ls - List directory contents (real filesystem)
• cat [section] - Display content of a section
• whoami - Display information about Markus
• cto - CTO/CIO/CSO as a Service (€1,400/month)
• contact - Open contact form
• chat - Chat with Markus's AI Assistant
• lang [en|de] - Change language

Neural Link to Skills:
• hardskills - Technical expertise & competencies
• softskills - Leadership roles & interdisciplinary strengths

Real system commands:
• ping <host> - Network connectivity test
• host <domain> - DNS lookup
• uname -a - System information
• date - Current date and time
• ps - Running processes
• df -h - Disk usage`,
    DE: `Verfügbare Befehle:
• help - Diese Hilfe anzeigen
• list - Verfügbare Portfolio-Bereiche auflisten
• clear - Terminal-Bildschirm leeren
• ls - Verzeichnisinhalt auflisten (echtes Dateisystem)
• cat [bereich] - Inhalt eines Bereichs anzeigen
• whoami - Informationen über Markus anzeigen
• cto - CTO/CIO/CSO als Service (€1.400/Monat)
• contact - Kontaktformular öffnen
• chat - Mit Markus's KI-Assistenten chatten
• lang [en|de] - Sprache ändern

Neural Link zu Fähigkeiten:
• hardskills - Technische Expertise & Kompetenzen
• softskills - Führungsrollen & interdisziplinäre Stärken

Echte System-Befehle:
• ping <host> - Netzwerk-Konnektivitätstest
• host <domain> - DNS-Auflösung
• uname -a - System-Informationen
• date - Aktuelles Datum und Uhrzeit
• ps - Laufende Prozesse
• df -h - Festplattenbelegung`
  },
  ls: {
    EN: `Available sections:
• about - About me and vision projects
• services - Maiwald Enterprises BV service pillars
• blockchain - Blockchain & Web3 solutions
• cloud - Cloud & infrastructure architecture
• development - Custom software & systems integration
• projects - Personal R&D projects (OS, TTRPG)`,
    DE: `Verfügbare Bereiche:
• about - Über mich und Visionsprojekte
• services - Maiwald Enterprises BV Dienstleistungssäulen
• blockchain - Blockchain & Web3-Lösungen
• cloud - Cloud & Infrastruktur-Architektur
• development - Individuelle Software & Systemintegration
• projects - Persönliche F&E-Projekte (OS, TTRPG)`
  },
  list: {
    EN: `Available portfolio sections:
• about - Strategic architect profile
• services - Maiwald Enterprises service portfolio  
• blockchain - Digital sovereignty & decentralization
• cloud - Infrastructure architecture & deployment
• development - Technology solutions & consulting
• projects - Strategic R&D initiatives
• hardskills - Technical expertise & competencies
• softskills - Leadership roles & interdisciplinary strengths
• legal - Corporate compliance & privacy policy

Use 'cat <section>' to view detailed content.`,
    DE: `Verfügbare Portfolio-Bereiche:
• about - Strategisches Architektenprofil
• services - Maiwald Enterprises Dienstleistungsportfolio
• blockchain - Digitale Souveränität & Dezentralisierung
• cloud - Infrastruktur-Architektur & Deployment
• development - Technologielösungen & Beratung
• projects - Strategische F&E-Initiativen
• hardskills - Technische Expertise & Kompetenzen
• softskills - Führungsrollen & interdisziplinäre Stärken
• legal - Unternehmens-Compliance & Datenschutzrichtlinie

Verwenden Sie 'cat <bereich>', um detaillierte Inhalte anzuzeigen.`
  },
  whoami: {
    EN: `Markus Maiwald - Technology Architect & Founder, Maiwald Enterprises BV

Based in the Aachen-Maastricht region for over 14 years, I am a technology architect who delivers complex cloud and blockchain solutions for forward-thinking organizations, driven by a personal passion for building the foundational systems—from operating systems to decentralized digital identities—that will define our future.

Email: markus@maiwald.work
Location: Aachen-Maastricht region, Germany
Company: Maiwald Enterprises BV

My strategic capabilities are underpinned by two key areas of personal research:

• Foundational System Architecture: Developer of a custom operating system and package manager (git.maiwald.work) - providing deep, structural understanding of system performance, security, and scalability.

• Next-Generation Digital Identity: Prototyping the future through a novel tabletop RPG that integrates AI Game Master with Self-Sovereign Identity (SSI) and Decentralized Identifiers (DIDs) - a practical laboratory for Web3 concepts.

I don't just talk about the future of technology; I actively build it.`,
    DE: `Markus Maiwald - Technologie-Architekt & Gründer, Maiwald Enterprises BV

Seit über 14 Jahren in der Region Aachen-Maastricht ansässig, bin ich ein Technologie-Architekt, der komplexe Cloud- und Blockchain-Lösungen für zukunftsorientierte Organisationen liefert, angetrieben von einer persönlichen Leidenschaft für den Aufbau grundlegender Systeme—von Betriebssystemen bis hin zu dezentralen digitalen Identitäten—die unsere Zukunft bestimmen werden.

Email: markus@maiwald.work
Standort: Region Aachen-Maastricht, Deutschland
Unternehmen: Maiwald Enterprises BV

Meine strategischen Fähigkeiten basieren auf zwei wichtigen Bereichen persönlicher Forschung:

• Grundlegende Systemarchitektur: Entwickler eines benutzerdefinierten Betriebssystems und Paketmanagers (git.maiwald.work) - bietet tiefes, strukturelles Verständnis für Systemleistung, Sicherheit und Skalierbarkeit.

• Digitale Identität der nächsten Generation: Prototyping der Zukunft durch ein neuartiges Tabletop-RPG, das AI Game Master mit Self-Sovereign Identity (SSI) und Decentralized Identifiers (DIDs) integriert - ein praktisches Labor für Web3-Konzepte.

Ich rede nicht nur über die Zukunft der Technologie; ich baue sie aktiv auf.`
  },
  cv: {
    EN: `CURRICULUM VITAE - Markus Maiwald

PROFESSIONAL EXPERIENCE
• Infrastructure Architect - Building decentralized systems
• Cloud Solutions Expert - AWS, Azure, Google Cloud
• Security Consultant - Penetration testing and security audits
• Linux System Administrator - 10+ years experience

TECHNICAL SKILLS
• Languages: Python, Go, Rust, JavaScript, Shell Scripting
• Cloud Platforms: AWS, Azure, GCP, Kubernetes
• Security Tools: Metasploit, Nmap, Wireshark, Burp Suite
• Infrastructure: Docker, Terraform, Ansible, CI/CD

CERTIFICATIONS
• AWS Solutions Architect Professional
• Certified Kubernetes Administrator (CKA)
• CISSP - Certified Information Systems Security Professional`,
    DE: `LEBENSLAUF - Markus Maiwald

BERUFSERFAHRUNG
• Infrastruktur-Architekt - Aufbau dezentraler Systeme
• Cloud-Lösungsexperte - AWS, Azure, Google Cloud
• Sicherheitsberater - Penetrationstests und Sicherheitsaudits
• Linux-Systemadministrator - 10+ Jahre Erfahrung

TECHNISCHE FÄHIGKEITEN
• Programmiersprachen: Python, Go, Rust, JavaScript, Shell-Scripting
• Cloud-Plattformen: AWS, Azure, GCP, Kubernetes
• Sicherheitstools: Metasploit, Nmap, Wireshark, Burp Suite
• Infrastruktur: Docker, Terraform, Ansible, CI/CD

ZERTIFIZIERUNGEN
• AWS Solutions Architect Professional
• Certified Kubernetes Administrator (CKA)
• CISSP - Certified Information Systems Security Professional`
  },
  services: {
    EN: `CTO/CIO/CSO AS A SERVICE - STRATEGIC TECHNOLOGY LEADERSHIP
€1,400/month | 20-30 hours guaranteed | Fixed & predictable pricing

HOW IT WORKS - A BETTER WORKFLOW
Replace unreliable freelancers and costly agencies with founder-friendly strategic technology leadership at a fixed fee.

ESSENTIAL MVPS FOR FOUNDERS
No more over-engineered products. We'll help you build an effective MVP and iterate to product-market fit, reducing capital and time risk.

PROFESSIONAL CTO LEADERSHIP
Avoid paying for unnecessary agency overhead or managing freelancers. We'll help you scale your team when it's time, manage the process, and lead the technical vision for you.

YOU'RE IN CONTROL
Effortlessly manage your project board asynchronously. Keep track of active, queued, and completed tasks with complete transparency.

MEMBERSHIP BENEFITS - SO GOOD YOU'LL NEVER NEED TO LOOK ELSEWHERE

🎯 PERSONAL TASK BOARD
Add and track your active, queued, and completed tasks with utmost convenience.

💰 KEEP 100% OF EQUITY
No need to part with equity or stock options, unless you really want to.

📊 FIXED & PREDICTABLE PRICING
No surprises! Extend your runway with a fixed monthly price for strategic technology leadership.

🚀 UNLIMITED REQUESTS
Add as many requests to your board as you want. We'll handle them as they come in.

⚡ FAST TURNAROUND
Get tasks completed in just a few days on average. We'll iterate until you're satisfied.

👥 INVITE EVERYONE
Add your team to submit requests and track progress collaboratively.

🏆 FULL IP OWNERSHIP
You own 100% of source materials and intellectual property. We work for you.

📞 AD-HOC SYNC CALLS
Direct access to strategic consultation, brainstorming, demos, and planning sessions.

📈 FLEXIBLE & SCALABLE
When it's time to grow - we'll help you find, onboard, and manage dedicated skilled developers.

CORE SERVICES INCLUDED
• Strategic technology roadmapping and architecture decisions
• MVP development and product-market fit iteration  
• Team scaling and technical hiring guidance
• Code reviews and technical quality assurance
• Infrastructure planning and cloud architecture
• Security and compliance strategic planning
• Vendor evaluation and technology stack decisions
• Technical due diligence and risk assessment

Maiwald Enterprises BV is your strategic technology partner for complex infrastructure challenges. We deliver enterprise-grade solutions across the complete technology spectrum.

I. CORE COMPETENCIES: INFRASTRUCTURE, VIRTUALIZATION & CLOUD
(Connecting directly to infrastructure solutions, virtualization, server, storage & backup)

VIRTUALIZATION PLATFORMS:
• Proxmox VE: Deep expertise in designing and managing high-availability clusters, including Ceph, ZFS storage and live migration
• VMware vSphere & Microsoft Hyper-V: Solid administration and management skills, ideal for integration into existing customer environments

SYSTEM & SERVER MANAGEMENT (Linux/BSD):
• Expert knowledge in administration, hardening and performance optimization of Linux servers (Debian, Arch, RHEL) and BSD systems (OpenBSD, FreeBSD)
• I build custom Linux variants as a hobby project
• Seamless integration into existing Windows networks (Active Directory, file shares, etc.)

CLOUD & HYBRID INFRASTRUCTURES:
• Architecture and management of solutions on AWS and Google Cloud Platform (GCP)
• Design of hybrid scenarios connecting on-premise infrastructure with cloud resources
• Expertise in Infrastructure-as-Code (IaC) for automation and standardization of deployments (Terraform, Kubernetes)

STORAGE & BACKUP SOLUTIONS:
• Planning and implementation of high-performance modern storage systems (ZFS, NVMe-over-TCP) as well as traditional SAN/NAS
• Development of multi-tier backup concepts with tools like Restic, Borg, traditional solutions like Veeam and classic tape systems (LTO)

II. IT-SECURITY & NETWORK ARCHITECTURE

FIREWALL & NETWORK SECURITY:
• Design and operation of powerful, vendor-independent firewall solutions with OPNsense, pfSense and nftables/iptables
• Implementation of Zero-Trust architectures and secure VPN access (WireGuard, IPsec)
• Expert in Cloud Security with Cloudflare

NETWORK DESIGN & MANAGEMENT:
• Planning and implementation of efficient and scalable networks (VLANs, Routing, DNS, DHCP)
• Analysis and optimization of existing network infrastructures to improve performance and security

ENDPOINT & SERVER HARDENING:
• Systematic hardening of server operating systems and services to minimize attack surfaces, as a complement to endpoint solutions like UniFi, Juniper, Dell, HP

🧠 AI & DATA ANALYTICS
• Development of intelligent solutions for process optimization
• AI Integration: RAG (Retrieval-Augmented Generation), RASA, GPT
• Reporting, Testing, Predictive Analytics
• Custom AI assistants and automation systems

☁️ CLOUD, VIRTUALIZATION & INFRASTRUCTURE
• Kubernetes (K8s) & Container Orchestration
• Scalable Cloud & Hybrid Infrastructure
• Proxmox, VMware vSphere, Hyper-V
• GitLab, Gitea, CI/CD Deployment Pipelines
• Infrastructure-as-Code, Automation

🧱 SERVER, LINUX & BSD EXPERTISE
• Linux: Debian, Arch, Alpine, RHEL
• BSD: OpenBSD, FreeBSD (Routing, Firewalls, Hardened Services)
• Headless Server Deployments
• Systemd, OpenRC, CRON, System Monitoring
• Remote Access & Bastion Setups (SSH, Tailscale, WireGuard)

🌐 NETWORKING & FIREWALLS
• Network Architecture: VLANs, Subnetting, DNS, DHCP, NAT
• Open Source Firewalls: pfSense, OPNsense, nftables, iptables
• Zero Trust Networking, VPN: WireGuard, IPSec
• Redundant Gateways, Failover Strategies
• Monitoring: Grafana, Prometheus, Zabbix, Uptime-Kuma

🔐 CYBERSECURITY
• Endpoint Security, Patch Management, VPN
• Server Security: Firewalls, Bastion Hosts, Cluster Failover
• Admin Tier Concepts, Access Control, Compliance Audits
• Physical Security: Alarm Systems, Redundant Server Rooms
• Mail & DMS Security (MailStore, DMS Access Control)

🖥️ HARDWARE & SYSTEM LIFECYCLE
Planning, Setup, Maintenance of:
• Servers, Clusters, Workstations, Network Infrastructure
• Backup Servers, Storage (SAN/NAS/DAS), UPS
• Security Components, Climate Control, Time Tracking Systems
• Lifecycle Management: 2-8 year cycles by device type

📡 WEBSERVER & SERVICES
• Hosting & Operation of Web Servers: nginx, Apache, Caddy
• Reverse Proxies, Load Balancing, SSL/TLS, ACME
• Self-Hosted Services: Gitea, Forgejo, Nextcloud, Matrix, Jitsi

📎 DOCUMENTATION & ARCHIVING
• Document Management Systems (DMS):
  Metadata, Full-text Search, Access Control, Process Integration
• Mail Archiving with MailStore: Compliance & Interfaces
• Version Control, Rights & Compliance Structures

📦 DEPLOYMENT & AUTOMATION
• Automation of Setup, Maintenance, Updates
• CI/CD with GitLab, Gitea, shell/Nix scripts
• PXE, Cloud-Init, Ignition, Butane
• Container Deployment with Docker, Podman, systemd-nspawn

🧰 IT MANAGEMENT & SUPPORT
• ITIL-oriented Support Levels 0-4
• SLA Design, Audits, License Tours
• Strategic IT Planning, Budgeting, Technology Trends
• Monitoring, Reporting, Incident & Problem Management

OPERATIONAL MODEL: GLOBAL TALENT, LOCAL STRATEGY
We are a 100% remote, globally distributed team of senior specialists. This allows us to assemble the perfect, bespoke team for your specific project, ensuring you work with the absolute best talent in every required discipline.

Contact: markus@maiwald.work for strategic technology partnership discussions.`,
    DE: `CTO/CIO/CSO ALS SERVICE - STRATEGISCHE TECHNOLOGIEFÜHRUNG
1.400€/Monat | 20-30 Stunden garantiert | Feste & vorhersagbare Preise

Ersetzen Sie unzuverlässige Freelancer und teure Agenturen durch gründerfreundliche strategische Technologieführung zu einem festen Preis.

WESENTLICHE MVPS FÜR GRÜNDER
Keine überentwickelten Produkte mehr. Wir helfen Ihnen, ein effektives MVP zu entwickeln und bis zur Produkt-Markt-Passung zu iterieren, wodurch Kapital- und Zeitrisiken reduziert werden.

PROFESSIONELLE CTO-FÜHRUNG
Vermeiden Sie unnötige Agentur-Overhead-Kosten oder Freelancer-Management. Wir helfen Ihnen beim Skalieren Ihres Teams und leiten die technische Vision für Sie.

SIE HABEN DIE KONTROLLE
Verwalten Sie Ihr Projektboard mühelos asynchron. Behalten Sie den Überblick über aktive, wartende und abgeschlossene Aufgaben mit vollständiger Transparenz.

MITGLIEDSCHAFTSVORTEILE - SO GUT, DASS SIE NIE WOANDERS SUCHEN MÜSSEN

🎯 PERSÖNLICHES TASK BOARD
Fügen Sie Ihre aktiven, wartenden und abgeschlossenen Aufgaben hinzu und verfolgen Sie sie bequem.

💰 BEHALTEN SIE 100% DER ANTEILE
Keine Notwendigkeit, Anteile oder Aktienoptionen abzugeben, es sei denn, Sie möchten es wirklich.

📊 FESTE & VORHERSAGBARE PREISE
Keine Überraschungen! Verlängern Sie Ihre Runway mit einem festen monatlichen Preis für strategische Technologieführung.

🚀 UNBEGRENZTE ANFRAGEN
Fügen Sie so viele Anfragen zu Ihrem Board hinzu, wie Sie möchten. Wir bearbeiten sie nach Eingang.

⚡ SCHNELLE BEARBEITUNGSZEIT
Lassen Sie Aufgaben im Durchschnitt in wenigen Tagen erledigen. Wir iterieren, bis Sie zufrieden sind.

👥 ALLE EINLADEN
Fügen Sie Ihr Team hinzu, um Anfragen zu stellen und den Fortschritt gemeinsam zu verfolgen.

🏆 VOLLSTÄNDIGES IP-EIGENTUM
Sie besitzen 100% der Quellmaterialien und des geistigen Eigentums. Wir arbeiten für Sie.

📞 AD-HOC-SYNC-CALLS
Direkter Zugang zu strategischer Beratung, Brainstorming, Demos und Planungssitzungen.

📈 FLEXIBEL & SKALIERBAR
Wenn es Zeit zum Wachsen ist - wir helfen Ihnen, qualifizierte Entwickler zu finden, einzuarbeiten und zu verwalten.

KERNSERVICES ENTHALTEN
• Strategische Technologie-Roadmapping und Architektur-Entscheidungen
• MVP-Entwicklung und Produkt-Markt-Fit-Iteration
• Team-Skalierung und technische Einstellungsberatung  
• Code-Reviews und technische Qualitätssicherung
• Infrastruktur-Planung und Cloud-Architektur
• Sicherheits- und Compliance-Strategieplanung
• Anbieter-Bewertung und Technologie-Stack-Entscheidungen
• Technische Due Diligence und Risikobewertung

I. KERNKOMPETENZEN: INFRASTRUKTUR, VIRTUALISIERUNG & CLOUD
(Knüpft an deren Hauptgeschäft an: "Infrastrukturlösungen", "Virtualisierung", "Server, Storage & Backup")

VIRTUALISIERUNGSPLATTFORMEN:
• Proxmox VE: Tiefgehende Expertise in Design und Verwaltung von hochverfügbaren Clustern, inklusive Ceph, ZFS-Storage und Live-Migration
• VMware vSphere & Microsoft Hyper-V: Solide Kenntnisse in der Administration und im Management, ideal für die Integration in bestehende Kundenumgebungen

SYSTEM- & SERVER-MANAGEMENT (Linux/BSD):
• Expertenwissen in Administration, Härtung und Performance-Optimierung von Linux-Servern (Debian, Arch, RHEL) und BSD-Systemen (OpenBSD, FreeBSD)
• Ich baue eigene LINUX-Varianten als Hobby
• Nahtlose Integration in bestehende Windows-Netzwerke (Active Directory, Fileshares, etc.)

CLOUD & HYBRIDE INFRASTRUKTUREN:
• Architektur und Management von Lösungen auf AWS und Google Cloud Platform (GCP)
• Konzeption von hybriden Szenarien, die On-Premise-Infrastruktur mit Cloud-Ressourcen verbinden
• Expertise in Infrastructure-as-Code (IaC) zur Automatisierung und Standardisierung von Deployments (Terraform, Kubernetes)

STORAGE & BACKUP-LÖSUNGEN:
• Planung und Implementierung von hoch performanten modernen Storage-Systemen (ZFS, NVMe-over-TCP) aber auch klassischen SAN/NAS
• Entwicklung mehrstufiger Backup-Konzepte mit Tools wie Restic, Borg, klassischen wie Veeam und traditionellen Bandsystemen (LTO)

II. IT-SECURITY & NETZWERKARCHITEKTUR

FIREWALL & NETZWERKSICHERHEIT:
• Konzeption und Betrieb von leistungsstarken, herstellerunabhängigen Firewall-Lösungen mit OPNsense, pfSense und nftables/iptables
• Aufbau von Zero-Trust-Architekturen und sicheren VPN-Zugängen (WireGuard, IPsec)
• Experte in Cloud Security mit Cloudflare

NETZWERK-KONZEPTION & -MANAGEMENT:
• Planung und Umsetzung von effizienten und skalierbaren Netzwerken (VLANs, Routing, DNS, DHCP)
• Analyse und Optimierung bestehender Netzwerk-Infrastrukturen zur Steigerung von Performance und Sicherheit

ENDPOINT & SERVER HARDENING:
• Systematische Härtung von Server-Betriebssystemen und Diensten zur Minimierung von Angriffsflächen, als Ergänzung zu Endpoint-Lösungen wie UniFi, Juniper, Dell, HP

Kontakt für maßgeschneiderte Lösungen: markus@maiwald.work`
  },
  security: {
    EN: `SECURITY EXPERTISE

PENETRATION TESTING
• Web application security testing
• Network penetration testing
• Mobile application security assessment
• Social engineering assessments

VULNERABILITY MANAGEMENT
• Automated vulnerability scanning
• Manual security code reviews
• Risk assessment and prioritization
• Remediation planning and guidance

SECURITY ARCHITECTURE
• Zero-trust architecture design
• Identity and access management (IAM)
• Network segmentation and micro-segmentation
• Cryptographic implementations

INCIDENT RESPONSE
• 24/7 security monitoring and response
• Digital forensics and malware analysis
• Threat hunting and intelligence
• Business continuity planning`,
    DE: `SICHERHEITSEXPERTISE

PENETRATIONSTESTS
• Webanwendungs-Sicherheitstests
• Netzwerk-Penetrationstests
• Mobile-App-Sicherheitsbewertung
• Social-Engineering-Bewertungen

SCHWACHSTELLEN-MANAGEMENT
• Automatisierte Schwachstellen-Scans
• Manuelle Sicherheits-Code-Reviews
• Risikobewertung und Priorisierung
• Sanierungsplanung und -beratung

SICHERHEITSARCHITEKTUR
• Zero-Trust-Architektur-Design
• Identitäts- und Zugriffsverwaltung (IAM)
• Netzwerksegmentierung und Mikrosegmentierung
• Kryptographische Implementierungen

INCIDENT RESPONSE
• 24/7-Sicherheitsüberwachung und -reaktion
• Digitale Forensik und Malware-Analyse
• Bedrohungsjagd und Intelligence
• Business-Continuity-Planung`
  },
  about: {
    EN: `ABOUT MARKUS MAIWALD - THE STRATEGIC ARCHITECT

I'm Markus Maiwald, a technology architect and the founder of Maiwald Enterprises BV. Based in the Aachen-Maastricht region for 14 years, I partner with organizations to design, architect, and deliver bespoke technology solutions in complex domains like blockchain, cloud infrastructure, and custom software. My role is to provide the strategic oversight that bridges the gap between ambitious business goals and elite technical execution.

My strategic capabilities are underpinned by two key areas of personal research and development:

FOUNDATIONAL SYSTEM ARCHITECTURE
I am the developer of a custom operating system and package manager (git.maiwald.work). This hands-on, first-principles approach to computing provides me with a deep, structural understanding of system performance, security, and scalability that is rare in today's high-abstraction environment. This expertise is critical when designing robust, cost-effective cloud solutions for my clients.

This rigorous, low-level work on system architecture directly translates into how I design solutions for clients. It provides me with a rare perspective on optimizing cloud infrastructure for performance and cost, and it informs my ability to architect resilient, highly scalable platforms that are built to last.

NEXT-GENERATION DIGITAL IDENTITY
I am prototyping the future of user-centric applications through the development of a novel tabletop RPG. This project integrates a mobile AI Game Master with a revolutionary identity layer built on Self-Sovereign Identity (SSI) and Decentralized Identifiers (DIDs). It serves as a practical laboratory for Web3 concepts, allowing me to explore the implementation of portable digital assets and verifiable data.

My hands-on development with Decentralized Identifiers and AI in the TTRPG project is a practical R&D lab for the future of Web3 and intelligent systems. It allows me to move beyond theory and gain battle-tested insights into the real-world challenges and opportunities of these transformative technologies. When I advise clients on blockchain or AI strategy, I bring not just knowledge, but practical experience from the frontiers of innovation.

My personal projects ensure that the strategic advice I provide is grounded in real-world implementation experience. I don't just talk about the future of technology; I actively build it.

If your organization requires a technology partner with a proven ability to architect and deliver high-stakes projects, let's connect.`,
    DE: `ÜBER MARKUS MAIWALD - DER STRATEGISCHE ARCHITEKT

Ich bin Markus Maiwald, ein Technologie-Architekt und Gründer von Maiwald Enterprises BV. Seit 14 Jahren in der Region Aachen-Maastricht ansässig, arbeite ich mit Organisationen zusammen, um maßgeschneiderte Technologielösungen in komplexen Bereichen wie Blockchain, Cloud-Infrastruktur und individueller Software zu entwerfen, zu architekturieren und bereitzustellen. Meine Rolle besteht darin, die strategische Übersicht zu bieten, die die Lücke zwischen ehrgeizigen Geschäftszielen und erstklassiger technischer Umsetzung schließt.

Meine strategischen Fähigkeiten basieren auf zwei wichtigen Bereichen persönlicher Forschung und Entwicklung:

GRUNDLEGENDE SYSTEMARCHITEKTUR
Ich bin der Entwickler eines benutzerdefinierten Betriebssystems und Paketmanagers (git.maiwald.work). Dieser praktische, grundsätzliche Ansatz zum Computing bietet mir ein tiefes, strukturelles Verständnis für Systemleistung, Sicherheit und Skalierbarkeit, das in der heutigen hochabstrakten Umgebung selten ist. Diese Expertise ist entscheidend beim Entwerfen robuster, kostengünstiger Cloud-Lösungen für meine Kunden.

Diese rigorose, low-level Arbeit an der Systemarchitektur überträgt sich direkt darauf, wie ich Lösungen für Kunden entwerfe. Sie bietet mir eine seltene Perspektive zur Optimierung der Cloud-Infrastruktur für Leistung und Kosten und informiert meine Fähigkeit, belastbare, hochskalierbare Plattformen zu architekturieren, die für die Zukunft gebaut sind.

DIGITALE IDENTITÄT DER NÄCHSTEN GENERATION
Ich prototypisiere die Zukunft benutzerzentrierter Anwendungen durch die Entwicklung eines neuartigen Tabletop-RPGs. Dieses Projekt integriert einen mobilen AI Game Master mit einer revolutionären Identitätsschicht, die auf Self-Sovereign Identity (SSI) und Decentralized Identifiers (DIDs) basiert. Es dient als praktisches Labor für Web3-Konzepte und ermöglicht mir die Erforschung der Implementierung tragbarer digitaler Assets und verifizierbarer Daten.

Meine praktische Entwicklung mit Decentralized Identifiers und AI im TTRPG-Projekt ist ein praktisches F&E-Labor für die Zukunft von Web3- und intelligenten Systemen. Es ermöglicht mir, über die Theorie hinauszugehen und kampferprobte Einblicke in die realen Herausforderungen und Chancen dieser transformativen Technologien zu gewinnen.

Meine persönlichen Projekte stellen sicher, dass die strategische Beratung, die ich anbiete, auf realer Implementierungserfahrung basiert. Ich rede nicht nur über die Zukunft der Technologie; ich baue sie aktiv auf.`
  },
  blockchain: {
    EN: `BLOCKCHAIN & WEB3 SOLUTIONS - CO-FOUNDER & ADVISOR

PROVEN TRACK RECORD IN BLOCKCHAIN INNOVATION
Co-founder and advisor of several groundbreaking crypto projects:
• Internet of People (IoP) - Decentralized identity and social networking protocol
• PIVX - Privacy-focused cryptocurrency with governance innovation
• Hydraledger - Custom Layer1 blockchain architecture
  Live Network: explorer.hydraledger.tech

LAYER1 BLOCKCHAIN DEVELOPMENT
• Custom blockchain architecture and consensus mechanisms
• Protocol design and economic modeling
• Network security and validator infrastructure
• Cross-chain interoperability solutions

ENTERPRISE BLOCKCHAIN SERVICES
From Development to Infrastructure and Advisory:

SMART CONTRACT & DAPP DEVELOPMENT
• Multi-chain smart contract architecture (Ethereum, Polygon, Solana)
• DeFi protocol development and tokenomics design
• NFT marketplace and gaming integration
• Cross-chain bridge development and security audits

SELF-SOVEREIGN IDENTITY (SSI) & DIDs
• Decentralized Identifier (DID) implementation and integration
• Verifiable Credentials architecture for enterprise use cases
• Identity wallet development and user experience design
• Privacy-preserving authentication systems

BLOCKCHAIN INFRASTRUCTURE & CONSULTING
• Node deployment and validator network setup
• Blockchain security audits and penetration testing
• Regulatory compliance and legal framework guidance
• Technical due diligence for blockchain investments

PRIVACY & SCALABILITY SOLUTIONS
• Zero-knowledge proof implementation (zk-SNARKs, zk-STARKs)
• Layer 2 scaling solutions and state channels
• Privacy-preserving transaction mechanisms
• Mixnet and anonymity network integration

Whether you need technical blockchain development, strategic advisory, or complete infrastructure deployment, we deliver enterprise-grade solutions backed by years of hands-on experience building and scaling decentralized networks.

Contact: markus@maiwald.work for blockchain consulting and development partnerships.`,
    DE: `BLOCKCHAIN & WEB3-LÖSUNGEN - MITGRÜNDER & BERATER

BEWÄHRTE ERFOLGSBILANZ IN BLOCKCHAIN-INNOVATION
Mitgründer und Berater mehrerer bahnbrechender Krypto-Projekte:
• Internet of People (IoP) - Dezentrales Identitäts- und Social-Networking-Protokoll
• PIVX - Datenschutzfokussierte Kryptowährung mit Governance-Innovation
• Hydraledger - Maßgeschneiderte Layer1-Blockchain-Architektur
  Live-Netzwerk: explorer.hydraledger.tech

LAYER1-BLOCKCHAIN-ENTWICKLUNG
• Maßgeschneiderte Blockchain-Architektur und Konsensus-Mechanismen
• Protokoll-Design und wirtschaftliche Modellierung
• Netzwerksicherheit und Validator-Infrastruktur
• Cross-Chain-Interoperabilitätslösungen

ENTERPRISE BLOCKCHAIN-DIENSTLEISTUNGEN
Von der Entwicklung bis zur Infrastruktur und Beratung:

SMART CONTRACT & DAPP-ENTWICKLUNG
• Multi-Chain Smart Contract-Architektur (Ethereum, Polygon, Solana)
• DeFi-Protokoll-Entwicklung und Tokenomics-Design
• NFT-Marktplatz und Gaming-Integration
• Cross-Chain-Bridge-Entwicklung und Sicherheitsaudits

SELF-SOVEREIGN IDENTITY (SSI) & DIDs
• Decentralized Identifier (DID) Implementierung und Integration
• Verifiable Credentials-Architektur für Unternehmensanwendungen
• Identity-Wallet-Entwicklung und Benutzererfahrungsdesign
• Datenschutzwahrende Authentifizierungssysteme

BLOCKCHAIN-INFRASTRUKTUR & BERATUNG
• Node-Deployment und Validator-Netzwerk-Setup
• Blockchain-Sicherheitsaudits und Penetrationstests
• Regulatory Compliance und rechtliche Rahmenberatung
• Technische Due Diligence für Blockchain-Investitionen

DATENSCHUTZ & SKALIERUNGSLÖSUNGEN
• Zero-Knowledge-Proof-Implementierung (zk-SNARKs, zk-STARKs)
• Layer-2-Skalierungslösungen und State-Channels
• Datenschutzwahrende Transaktionsmechanismen
• Mixnet- und Anonymitätsnetzwerk-Integration

Ob Sie technische Blockchain-Entwicklung, strategische Beratung oder komplette Infrastruktur-Deployment benötigen - wir liefern Enterprise-Grade-Lösungen, unterstützt durch jahrelange praktische Erfahrung im Aufbau und der Skalierung dezentraler Netzwerke.

Kontakt: markus@maiwald.work für Blockchain-Beratung und Entwicklungspartnerschaften.`
  },
  projects: {
    EN: `PERSONAL R&D PROJECTS - BUILDING THE FUTURE

NEXUSOS: MILITARY-GRADE OPERATING SYSTEM
Repository: git.maiwald.work/NexusLabs/livecd-arch-nexus

Military-grade security and modularity. Fast boot. No bloat. Hardened kernel. Zero GNUs given.

This foundational project represents my commitment to understanding technology from the kernel up. Building an operating system from scratch provides unparalleled insight into:

• System performance optimization at the lowest level
• Security architecture from first principles  
• Resource management and memory allocation
• Hardware abstraction and driver development
• Military-grade security hardening and modularity

NIMPAK: NEXT-GENERATION PACKAGE MANAGER
Repository: git.maiwald.work/NexusLabs/NimPak

Next-Generation Package Manager and System Management Tool for NexusOS. Revolutionary approach to dependency resolution, security verification, and system state management.

Key innovations:
• Zero-trust package verification with cryptographic signatures
• Immutable system states with atomic rollback capabilities
• Advanced dependency conflict resolution algorithms
• Parallel installation with lockless operations
• Integration with NexusOS security model

NEXUS BUILD TOOLKIT: CORE SYSTEM COMPILER
Repository: git.maiwald.work/NexusLabs/Nexus-Build-Toolkit

The Nexus Build Toolkit is the core system compiler and System Building Toolkit for NexusOS. Advanced compilation infrastructure for building secure, optimized system components.

Features:
• Custom LLVM-based compilation pipeline
• Security-first code generation and optimization
• Cross-platform system component building
• Integration with NexusOS kernel and runtime
• Advanced static analysis and security verification

This deep, structural knowledge directly informs every cloud architecture decision I make for clients. When I design scalable systems, I understand exactly what's happening at every layer of the stack.

TTRPG WITH AI GAME MASTER & SSI/DID IDENTITY
A Revolutionary Gaming Experience

This project synthesizes multiple frontier technologies into a single, compelling application:

AI GAME MASTER COMPONENT:
• Dynamic storyline generation using advanced language models
• Real-time game mechanics management
• Intelligent NPC (Non-Player Character) behavior
• Adaptive difficulty and narrative progression

SELF-SOVEREIGN IDENTITY LAYER:
• Each character has a unique Decentralized Identifier (DID)
• Verifiable Credentials for achievements and progression
• Portable identity across different game worlds
• Zero-knowledge proofs for private character attributes

PRACTICAL IMPLICATIONS:
This isn't just a game—it's a proof-of-concept for the future of digital identity. Players truly own their character data, can prove their achievements cryptographically, and can take their identity to any compatible platform.

The project demonstrates how SSI can make abstract concepts tangible and user-friendly, serving as a blueprint for implementing user-centric identity solutions in enterprise applications.

STRATEGIC VALUE:
These projects ensure that when I architect solutions for clients, I bring deep, hands-on experience with both foundational computing principles and cutting-edge emerging technologies. This combination of low-level systems knowledge and high-level innovation capabilities is exceptionally rare in the consulting space.`,
    DE: `PERSÖNLICHE F&E-PROJEKTE - DIE ZUKUNFT AUFBAUEN

NEXUSOS: MILITÄRISCHES BETRIEBSSYSTEM
Repository: git.maiwald.work/NexusLabs/livecd-arch-nexus

Militärische Sicherheit und Modularität. Schneller Boot. Kein Ballast. Gehärteter Kernel. Null GNUs gegeben.

Dieses grundlegende Projekt repräsentiert mein Engagement, Technologie vom Kernel aufwärts zu verstehen. Der Aufbau eines Betriebssystems von Grund auf bietet unvergleichliche Einblicke in:

• Systemleistungsoptimierung auf niedrigster Ebene
• Sicherheitsarchitektur aus ersten Prinzipien
• Ressourcenverwaltung und Speicherzuweisung
• Hardware-Abstraktion und Treiberentwicklung
• Militärische Sicherheitshärtung und Modularität

NIMPAK: NEXT-GENERATION PAKETMANAGER
Repository: git.maiwald.work/NexusLabs/NimPak

Next-Generation Paketmanager und System-Management-Tool für NexusOS. Revolutionärer Ansatz für Abhängigkeitsauflösung, Sicherheitsverifikation und Systemzustandsverwaltung.

Schlüsselinnovationen:
• Zero-Trust-Paketverifikation mit kryptographischen Signaturen
• Unveränderliche Systemzustände mit atomaren Rollback-Fähigkeiten
• Fortgeschrittene Abhängigkeitskonflikt-Auflösungsalgorithmen
• Parallele Installation mit sperrenfreien Operationen
• Integration mit NexusOS-Sicherheitsmodell

NEXUS BUILD TOOLKIT: KERNSYSTEM-COMPILER
Repository: git.maiwald.work/NexusLabs/Nexus-Build-Toolkit

Das Nexus Build Toolkit ist der Kernsystem-Compiler und System-Building-Toolkit für NexusOS. Fortgeschrittene Kompilierungsinfrastruktur für den Bau sicherer, optimierter Systemkomponenten.

Features:
• Benutzerdefinierte LLVM-basierte Kompilierungs-Pipeline
• Sicherheitsorientierte Code-Generierung und Optimierung
• Plattformübergreifender Systemkomponenten-Bau
• Integration mit NexusOS-Kernel und Runtime
• Fortgeschrittene statische Analyse und Sicherheitsverifikation

Dieses tiefe, strukturelle Wissen informiert direkt jede Cloud-Architekturentscheidung, die ich für Kunden treffe. Wenn ich skalierbare Systeme entwerfe, verstehe ich genau, was auf jeder Schicht des Stacks passiert.

TTRPG MIT AI GAME MASTER & SSI/DID-IDENTITÄT
Ein revolutionäres Spielerlebnis

Dieses Projekt synthetisiert mehrere Grenztechnologien in eine einzige, überzeugende Anwendung:

AI GAME MASTER KOMPONENTE:
• Dynamische Storyline-Generierung mit fortgeschrittenen Sprachmodellen
• Echtzeit-Spielmechanik-Management
• Intelligentes NPC (Non-Player Character) Verhalten
• Adaptive Schwierigkeit und narrative Progression

SELF-SOVEREIGN IDENTITY SCHICHT:
• Jeder Charakter hat einen einzigartigen Decentralized Identifier (DID)
• Verifiable Credentials für Errungenschaften und Fortschritt
• Tragbare Identität über verschiedene Spielwelten hinweg
• Zero-Knowledge-Proofs für private Charakterattribute

PRAKTISCHE AUSWIRKUNGEN:
Das ist nicht nur ein Spiel—es ist ein Proof-of-Concept für die Zukunft der digitalen Identität. Spieler besitzen ihre Charakterdaten wirklich, können ihre Errungenschaften kryptographisch beweisen und ihre Identität zu jeder kompatiblen Plattform mitnehmen.

Das Projekt demonstriert, wie SSI abstrakte Konzepte greifbar und benutzerfreundlich machen kann und dient als Blaupause für die Implementierung benutzerzentrierter Identitätslösungen in Unternehmensanwendungen.

STRATEGISCHER WERT:
Diese Projekte stellen sicher, dass ich, wenn ich Lösungen für Kunden architekturiere, tiefe, praktische Erfahrung sowohl mit grundlegenden Computing-Prinzipien als auch mit modernsten aufkommenden Technologien mitbringe. Diese Kombination aus Low-Level-Systemwissen und High-Level-Innovationsfähigkeiten ist im Beratungsbereich außergewöhnlich selten.`
  },
  hardskills: {
    EN: `HARD SKILLS OVERVIEW - TECHNICAL EXPERTISE

🧠 AI, DATA & AUTOMATION
AI Integration:
• RAG (Retrieval-Augmented Generation)
• RASA (Open Source Conversational AI)
• GPT-based Assistant Systems
• Reporting & Testing
• Predictive Analytics
• Configuration & Analysis Scripts
• Automation with GPO, Cron, systemd, shell

🧩 COMPUTATIONAL THINKING & HYBRID PROGRAMMING
The Future of Development:
• Computational Thinking: Problem decomposition, pattern recognition, abstraction, algorithmic design
• Context Engineering: Advanced prompt engineering for AI systems
• Hybrid Development: Fusion of symbolic deterministic coding with descriptive natural language
• Multilingual Programming: Artifacts mixing prose, code, images, and audio
• Human-AI Collaboration: Programming as collaborative process between human and machine
• Abstraction Evolution: Logic interweaving traditional code with natural language interfaces

💡 STRATEGIC IMPLICATIONS OF HYBRID PROGRAMMING
Business Value:
• Accelerated Development: Combining human intuition with AI capabilities
• Enhanced Team Collaboration: Bridge between technical and non-technical stakeholders
• Reduced Development Friction: Natural language reduces cognitive load
• Future-Proof Architecture: Preparing for the next evolution of programming
• Competitive Advantage: Early adoption of emerging paradigms
• Quality Assurance: AI-assisted code review and optimization

☁️ CLOUD, KUBERNETES & VIRTUALIZATION
• Kubernetes (K8s) Orchestration
• Containers: Docker, Podman, systemd-nspawn
• Proxmox VE Cluster
• VMware vSphere
• Hyper-V (technical administration)
• CI/CD Pipelines (GitLab CI, Gitea Actions)
• Infrastructure-as-Code (IaC)
• Cloud & Hybrid Infrastructures

🧱 LINUX & BSD SYSTEMS
• Linux (Arch, Debian, Alpine, RHEL)
• BSD (OpenBSD, FreeBSD): Routing, pf, Hardened Services
• Init Systems: systemd, OpenRC
• Network Integration & Headless Deployment
• Shell Scripting (sh, bash, fish, dash)

🌐 NETWORKING & FIREWALLS
• Network Design: VLAN, DNS, DHCP, NAT, MTU, Subnetting
• Routing Protocols, static & dynamic
• Open Source Firewalls: pfSense, OPNsense, iptables, nftables
• VPN Technologies: WireGuard, IPSec
• DNS: Unbound, PowerDNS, DNSSEC
• Monitoring: Grafana, Prometheus, Zabbix, Uptime-Kuma

🔐 CYBERSECURITY
• Endpoint Security
• Patch Management
• VPN & Zero Trust Architectures
• Bastion Hosts, SSH Hardening
• Server/Cluster Firewalling
• Storage & Backup Security
• Redundant & Isolated Network Zones
• Admin Tier Concepts, Access Control

💾 STORAGE, BACKUP & ARCHIVING
• SAN / NAS / DAS Setups
• Backup Systems: Veeam Backup & Replication, rsync, restic, borg
• Archive Systems: MailStore Server (IMAP/POP/Exchange)
• Document Management Systems (DMS) with Metadata, Full-text Search

🖥️ HARDWARE & EMBEDDED
• Server Clusters, Workstations, NAS, UPS
• LTO Tape Drives, RAID Controllers
• Time Tracking Terminals
• Smartboards, Projectors, Camera Surveillance
• Peripherals: Multifunction Printers, Plotters, Presenters
• Network Components: Switches, Firewalls, APs
• ARM & Embedded Devices

📡 WEBSERVER & SELF-HOSTING
• Web Servers: nginx, Apache, Caddy
• TLS Certificates (ACME, Let's Encrypt)
• Reverse Proxy, Load Balancing
• Services: Nextcloud, Forgejo/Gitea, Matrix/Synapse, Jitsi Meet, Private Bin, Miniflux, Pleroma

📦 DEPLOYMENT & OPERATING SYSTEMS
• PXE, Cloud-Init, Ignition, Butane
• Container Deployment
• Stateless Setup with OverlayFS / Btrfs / Bcachefs
• Operating Systems: Arch Linux, CachyOS, Debian, Void, OpenBSD/FreeBSD`,
    DE: `HARD SKILLS ÜBERSICHT - TECHNISCHE EXPERTISE

🧠 KI, DATEN & AUTOMATISIERUNG
KI-Integration:
• RAG (Retrieval-Augmented Generation)
• RASA (Open Source Conversational AI)
• GPT-basierte Assistenzsysteme
• Reporting & Testing
• Predictive Analytics
• Konfigurations- & Analyse-Skripte
• Automatisierung mit GPO, Cron, systemd, shell

🧩 COMPUTATIONAL THINKING & HYBRID PROGRAMMING
Die Zukunft der Entwicklung:
• Computational Thinking: Problemzerlegung, Mustererkennung, Abstraktion, algorithmisches Design
• Context Engineering: Erweiterte Prompt-Engineering für KI-Systeme
• Hybrid-Entwicklung: Fusion aus symbolischem deterministischem Code mit deskriptiver natürlicher Sprache
• Mehrsprachige Programmierung: Artefakte die Prosa, Code, Bilder und Audio kombinieren
• Mensch-KI-Zusammenarbeit: Programmierung als kollaborativer Prozess zwischen Mensch und Maschine
• Abstraktionsevolution: Logik die traditionellen Code mit natürlichen Sprachschnittstellen verwebt

💡 STRATEGISCHE IMPLIKATIONEN DER HYBRID-PROGRAMMIERUNG
Geschäftswert:
• Beschleunigte Entwicklung: Kombination menschlicher Intuition mit KI-Fähigkeiten
• Verbesserte Teamzusammenarbeit: Brücke zwischen technischen und nicht-technischen Stakeholdern
• Reduzierte Entwicklungsreibung: Natürliche Sprache reduziert kognitive Belastung
• Zukunftssichere Architektur: Vorbereitung auf die nächste Evolution der Programmierung
• Wettbewerbsvorteil: Frühe Annahme aufkommender Paradigmen
• Qualitätssicherung: KI-unterstützte Code-Review und Optimierung

☁️ CLOUD, KUBERNETES & VIRTUALISIERUNG
• Kubernetes (K8s) Orchestrierung
• Container: Docker, Podman, systemd-nspawn
• Proxmox VE Cluster
• VMware vSphere
• Hyper-V (nur technische Verwaltung)
• CI/CD Pipelines (GitLab CI, Gitea Actions)
• Infrastructure-as-Code (IaC)
• Cloud- & Hybrid-Infrastrukturen

🧱 LINUX & BSD SYSTEME
• Linux (Arch, Debian, Alpine, RHEL)
• BSD (OpenBSD, FreeBSD): Routing, pf, Hardened Services
• init-Systeme: systemd, OpenRC
• Netzwerkintegration & Headless Deployment
• Shellscripting (sh, bash, fish, dash)

🌐 NETZWERKE & FIREWALLS
• Netzwerkdesign: VLAN, DNS, DHCP, NAT, MTU, Subnetting
• Routingprotokolle, statisch & dynamisch
• Open Source Firewalls: pfSense, OPNsense, iptables, nftables
• VPN-Technologien: WireGuard, IPSec
• DNS: Unbound, PowerDNS, DNSSEC
• Monitoring: Grafana, Prometheus, Zabbix, Uptime-Kuma

🔐 CYBERSECURITY
• Endpoint Security
• Patch-Management
• VPN & Zero Trust Architectures
• Bastion Hosts, SSH Hardening
• Server/Cluster Firewalling
• Storage & Backup Security
• Redundante & isolierte Netzwerkzonen
• Admin Tier-Konzepte, Zugriffskontrolle

💾 STORAGE, BACKUP & ARCHIVIERUNG
• SAN / NAS / DAS Setups
• Backup-Systeme: Veeam Backup & Replication, rsync, restic, borg
• Archivsysteme: MailStore Server (IMAP/POP/Exchange)
• Dokumentenmanagementsysteme (DMS) mit Metadaten, Volltextsuche

🖥️ HARDWARE & EMBEDDED
• Server-Cluster, Workstations, NAS, USVs
• LTO-Bandlaufwerke, RAID-Controller
• Zeiterfassungsterminals
• Smartboards, Projektoren, Kameraüberwachung
• Peripherie: Multifunktionsdrucker, Plotter, Presenter
• Netzwerkkomponenten: Switches, Firewalls, APs
• ARM & Embedded Devices

📡 WEBSERVER & SELF-HOSTING
• Webserver: nginx, Apache, Caddy
• TLS-Zertifikate (ACME, Let's Encrypt)
• Reverse Proxy, Load Balancing
• Dienste: Nextcloud, Forgejo/Gitea, Matrix/Synapse, Jitsi Meet, Private Bin, Miniflux, Pleroma

📦 DEPLOYMENT & BETRIEBSSYSTEME
• PXE, Cloud-Init, Ignition, Butane
• Container-Deployment
• stateless Setup mit OverlayFS / Btrfs / Bcachefs
• Betriebssysteme: Arch Linux, CachyOS, Debian, Void, OpenBSD/FreeBSD`
  },
  softskills: {
    EN: `SOFT SKILLS & LEADERSHIP ROLES

🧑‍💼 EXECUTIVE & STRATEGIC LEADERSHIP
• CEO – Maiwald Enterprises BV (since 2017)
• CIO – IOP Global GmbH (2020)
• CTO – IOP Ventures (2016)
• Founding Executive in tech-driven ventures
• Long-term entrepreneurial leadership across Europe

🧩 ORGANIZATIONAL ROLES
• Platform Architect (SaaS, PaaS, IaaS)
• Product Developer with iterative, user-driven design philosophy
• Project Leader for distributed, multi-stakeholder teams
• Team Leader in agile, DevOps, and remote-first environments
• Network Security Officer with strong focus on Zero Trust, compliance & hardening

🌍 BLOCKCHAIN & DECENTRALIZATION
• Cryptocurrency Founder
• DAO Leader with a focus on governance, transparency & incentive systems
• Blockchain Visionary:
  - Network-State Design
  - Web3 Infrastructure
  - Decentralized Identity & Trustless Systems

🧠 INTERDISCIPLINARY STRENGTHS
• Strategic Thinker: bridging tech, product, and org
• Vision-setting for long-term, open-source aligned ecosystems
• High resilience and decision-making under uncertainty
• Systems & protocol-level abstraction mindset`,
    DE: `SOFT SKILLS & FÜHRUNGSROLLEN

🧑‍💼 EXECUTIVE & STRATEGISCHE FÜHRUNG
• CEO – Maiwald Enterprises BV (seit 2017)
• CIO – IOP Global GmbH (2020)
• CTO – IOP Ventures (2016)
• Gründungsführungskraft in technologiegetriebenen Unternehmen
• Langfristige unternehmerische Führung in Europa

🧩 ORGANISATORISCHE ROLLEN
• Plattform-Architekt (SaaS, PaaS, IaaS)
• Produktentwickler mit iterativer, nutzerorientierter Designphilosophie
• Projektleiter für verteilte, Multi-Stakeholder-Teams
• Teamleiter in agilen, DevOps- und Remote-First-Umgebungen
• Netzwerksicherheitsbeauftragter mit starkem Fokus auf Zero Trust, Compliance & Härtung

🌍 BLOCKCHAIN & DEZENTRALISIERUNG
• Kryptowährungs-Gründer
• DAO-Leiter mit Fokus auf Governance, Transparenz & Anreizsysteme
• Blockchain-Visionär:
  - Network-State Design
  - Web3-Infrastruktur
  - Dezentrale Identität & Vertrauenslose Systeme

🧠 INTERDISZIPLINÄRE STÄRKEN
• Strategischer Denker: Brückenschlag zwischen Tech, Produkt und Organisation
• Visionssetzung für langfristige, Open-Source-orientierte Ökosysteme
• Hohe Belastbarkeit und Entscheidungsfindung unter Unsicherheit
• System- und Protokoll-orientierte Abstraktionsdenkweise`
  },
  cloud: {
    EN: `CLOUD SOLUTIONS

AWS SERVICES
• EC2, S3, RDS, Lambda, CloudFormation
• EKS, ECS, Fargate for container workloads
• API Gateway, CloudFront, Route 53
• IAM, Cognito, Secrets Manager

GOOGLE CLOUD PLATFORM
• Compute Engine, Cloud Storage, Cloud SQL
• Google Kubernetes Engine (GKE)
• Cloud IAM, Cloud KMS
• Cloud Build, Deployment Manager

MULTI-CLOUD STRATEGIES
• Cloud-agnostic architecture design
• Disaster recovery across multiple clouds
• Cost optimization through cloud arbitrage
• Compliance and data sovereignty considerations`,
    DE: `CLOUD-LÖSUNGEN

AWS-DIENSTE
• EC2, S3, RDS, Lambda, CloudFormation
• EKS, ECS, Fargate für Container-Workloads
• API Gateway, CloudFront, Route 53
• IAM, Cognito, Secrets Manager

GOOGLE CLOUD PLATFORM
• Compute Engine, Cloud Storage, Cloud SQL
• Google Kubernetes Engine (GKE)
• Cloud IAM, Cloud KMS
• Cloud Build, Deployment Manager

MULTI-CLOUD-STRATEGIEN
• Cloud-agnostisches Architektur-Design
• Disaster Recovery über mehrere Clouds
• Kostenoptimierung durch Cloud-Arbitrage
• Compliance- und Datenhoheit-Überlegungen`
  },
  storage: {
    EN: `STORAGE SOLUTIONS

DISTRIBUTED STORAGE
• IPFS (InterPlanetary File System) implementation
• Blockchain-based storage solutions
• Decentralized storage networks
• Redundant and fault-tolerant architectures

DATABASE SOLUTIONS
• PostgreSQL, MySQL, MongoDB
• Redis, InfluxDB, Elasticsearch
• Database replication and sharding
• Performance optimization and tuning

BACKUP & RECOVERY
• Automated backup strategies
• Point-in-time recovery solutions
• Cross-region data replication
• Disaster recovery planning

DATA SECURITY
• Encryption at rest and in transit
• Key management and rotation
• Access control and audit logging
• Data governance and compliance`,
    DE: `SPEICHERLÖSUNGEN

VERTEILTE SPEICHER
• IPFS (InterPlanetary File System) Implementierung
• Blockchain-basierte Speicherlösungen
• Dezentrale Speichernetzwerke
• Redundante und fehlertolerante Architekturen

DATENBANK-LÖSUNGEN
• PostgreSQL, MySQL, MongoDB
• Redis, InfluxDB, Elasticsearch
• Datenbank-Replikation und Sharding
• Performance-Optimierung und Tuning

BACKUP & RECOVERY
• Automatisierte Backup-Strategien
• Point-in-Time-Recovery-Lösungen
• Cross-Region-Datenreplikation
• Disaster-Recovery-Planung

DATENSICHERHEIT
• Verschlüsselung im Ruhezustand und bei Übertragung
• Schlüsselverwaltung und -rotation
• Zugriffskontrolle und Audit-Logging
• Daten-Governance und Compliance`
  },
  development: {
    EN: `DEVELOPMENT SERVICES

SYSTEM ARCHITECTURE & LEADERSHIP
As System Architect, I deliver strategic technology solutions and lead development teams for complex projects:

• System Architecture Design - Scalable, secure, and maintainable solutions
• Product Development - From concept to deployment with strategic vision
• Team Leadership - Leading experienced development teams
• Technical Strategy - Aligning technology with business objectives

SPECIALIZED DOMAINS
I bring my own team for comprehensive development in:

• Crypto & Blockchain - DeFi protocols, smart contracts, tokenomics
• FinTech Solutions - Payment systems, trading platforms, compliance
• Smart Contracts - Solidity, Rust, audit and optimization
• Cloud Architecture - Multi-cloud, microservices, serverless
• Mobile Applications - Native iOS/Android, React Native, Flutter  
• Web Applications - Full-stack development, progressive web apps

TEAM CAPABILITIES
• Experienced developers across all major technologies
• DevOps and infrastructure specialists  
• UI/UX designers for user-centered design
• QA engineers for comprehensive testing
• Project managers for delivery excellence

DELIVERY APPROACH
• Agile methodologies with proven frameworks
• Continuous integration and deployment
• Code quality and security best practices
• Documentation and knowledge transfer`,
    DE: `ENTWICKLUNGSDIENSTE

SYSTEMARCHITEKTUR & FÜHRUNG
Als Systemarchitekt liefere ich strategische Technologie-Lösungen und führe Entwicklungsteams für komplexe Projekte:

• Systemarchitektur-Design - Skalierbare, sichere und wartbare Lösungen
• Produktentwicklung - Vom Konzept bis zur Bereitstellung mit strategischer Vision
• Teamführung - Führung erfahrener Entwicklungsteams
• Technische Strategie - Technologie mit Geschäftszielen abstimmen

SPEZIALISIERTE BEREICHE
Ich bringe mein eigenes Team für umfassende Entwicklung mit:

• Crypto & Blockchain - DeFi-Protokolle, Smart Contracts, Tokenomics
• FinTech-Lösungen - Zahlungssysteme, Handelsplattformen, Compliance
• Smart Contracts - Solidity, Rust, Audit und Optimierung
• Cloud-Architektur - Multi-Cloud, Microservices, Serverless
• Mobile Anwendungen - Native iOS/Android, React Native, Flutter
• Web-Anwendungen - Full-Stack-Entwicklung, Progressive Web Apps

TEAM-FÄHIGKEITEN
• Erfahrene Entwickler aller wichtigen Technologien
• DevOps- und Infrastruktur-Spezialisten
• UI/UX-Designer für benutzerzentriertes Design
• QA-Ingenieure für umfassende Tests
• Projektmanager für exzellente Lieferung

LIEFERANSATZ
• Agile Methoden mit bewährten Frameworks
• Kontinuierliche Integration und Bereitstellung
• Code-Qualität und Sicherheits-Best-Practices
• Dokumentation und Wissenstransfer`
  },
  languageChanged: {
    EN: "Language changed to English",
    DE: "Sprache geändert zu Deutsch"
  },
  contactOpening: {
    EN: "Opening contact form...",
    DE: "Kontaktformular wird geöffnet..."
  },
  commandNotFound: {
    EN: "command not found",
    DE: "Befehl nicht gefunden"
  },
  usage: {
    EN: "Usage",
    DE: "Verwendung"
  }
};
