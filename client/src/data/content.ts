export interface ContentData {
  [key: string]: {
    EN: string;
    DE: string;
  };
}

export const content: ContentData = {
  welcome: {
    EN: "Building the infrastructure for a decentralized future.",
    DE: "Aufbau der Infrastruktur für eine dezentrale Zukunft."
  },
  subtitle: {
    EN: "Linux aficionado, cloud architect, and crypto-anarchist.",
    DE: "Linux-Enthusiast, Cloud-Architekt und Krypto-Anarchist."
  },
  prompt: {
    EN: "Type in 'help', to start.",
    DE: "Geben Sie 'help' ein, um zu beginnen."
  },
  help: {
    EN: `Available commands:
• help - Show this help message
• clear - Clear the terminal screen
• ls - List available sections
• cat [section] - Display content of a section
• whoami - Display information about Markus
• contact - Open contact form
• lang [en|de] - Change language`,
    DE: `Verfügbare Befehle:
• help - Diese Hilfe anzeigen
• clear - Terminal-Bildschirm leeren
• ls - Verfügbare Bereiche auflisten
• cat [bereich] - Inhalt eines Bereichs anzeigen
• whoami - Informationen über Markus anzeigen
• contact - Kontaktformular öffnen
• lang [en|de] - Sprache ändern`
  },
  ls: {
    EN: `Available sections:
• cv - Curriculum Vitae
• services - Available services
• security - Security expertise
• cloud - Cloud solutions
• storage - Storage solutions
• development - Development services`,
    DE: `Verfügbare Bereiche:
• cv - Lebenslauf
• services - Verfügbare Dienstleistungen
• security - Sicherheitsexpertise
• cloud - Cloud-Lösungen
• storage - Speicherlösungen
• development - Entwicklungsdienste`
  },
  whoami: {
    EN: `Markus Maiwald
Email: group4it@terminal.local
Role: Infrastructure Architect & Crypto-Anarchist
Location: Germany
Specialties: Linux, Cloud Architecture, Decentralized Systems`,
    DE: `Markus Maiwald
Email: group4it@terminal.local
Rolle: Infrastruktur-Architekt & Krypto-Anarchist
Standort: Deutschland
Spezialgebiete: Linux, Cloud-Architektur, Dezentrale Systeme`
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
    EN: `SERVICES OFFERED

CLOUD ARCHITECTURE
• Design and implementation of scalable cloud solutions
• Migration from on-premises to cloud environments
• Multi-cloud strategy and hybrid cloud setups
• Cost optimization and performance tuning

SECURITY CONSULTING
• Penetration testing and vulnerability assessments
• Security architecture design and review
• Incident response and forensic analysis
• Compliance auditing (SOC2, ISO 27001, GDPR)

INFRASTRUCTURE AUTOMATION
• Infrastructure as Code (Terraform, CloudFormation)
• CI/CD pipeline design and implementation
• Container orchestration with Kubernetes
• Monitoring and alerting solutions

TRAINING & CONSULTING
• Linux system administration training
• Cloud migration workshops
• Security awareness training
• Technical consulting and advisory services`,
    DE: `ANGEBOTENE DIENSTLEISTUNGEN

CLOUD-ARCHITEKTUR
• Design und Implementierung skalierbarer Cloud-Lösungen
• Migration von On-Premises zu Cloud-Umgebungen
• Multi-Cloud-Strategie und Hybrid-Cloud-Setups
• Kostenoptimierung und Performance-Tuning

SICHERHEITSBERATUNG
• Penetrationstests und Schwachstellenbewertungen
• Sicherheitsarchitektur-Design und -Überprüfung
• Incident Response und forensische Analyse
• Compliance-Auditing (SOC2, ISO 27001, DSGVO)

INFRASTRUKTUR-AUTOMATISIERUNG
• Infrastructure as Code (Terraform, CloudFormation)
• CI/CD-Pipeline-Design und -Implementierung
• Container-Orchestrierung mit Kubernetes
• Monitoring- und Alerting-Lösungen

SCHULUNG & BERATUNG
• Linux-Systemadministrations-Schulungen
• Cloud-Migrations-Workshops
• Sicherheitsbewusstsein-Schulungen
• Technische Beratung und Beratungsdienstleistungen`
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
  cloud: {
    EN: `CLOUD SOLUTIONS

AWS SERVICES
• EC2, S3, RDS, Lambda, CloudFormation
• EKS, ECS, Fargate for container workloads
• API Gateway, CloudFront, Route 53
• IAM, Cognito, Secrets Manager

AZURE SERVICES
• Virtual Machines, Blob Storage, SQL Database
• Azure Kubernetes Service (AKS)
• Azure Active Directory, Key Vault
• Azure DevOps, ARM Templates

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

AZURE-DIENSTE
• Virtual Machines, Blob Storage, SQL Database
• Azure Kubernetes Service (AKS)
• Azure Active Directory, Key Vault
• Azure DevOps, ARM Templates

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

FULL-STACK DEVELOPMENT
• React, Vue.js, Angular frontend development
• Node.js, Python, Go backend development
• REST API and GraphQL development
• Database design and optimization

DEVOPS & AUTOMATION
• CI/CD pipeline implementation
• Infrastructure as Code (Terraform, Ansible)
• Container orchestration with Kubernetes
• Monitoring and observability solutions

BLOCKCHAIN DEVELOPMENT
• Smart contract development (Solidity, Rust)
• DeFi protocol implementation
• NFT marketplace development
• Cryptocurrency wallet integration

CONSULTING & ARCHITECTURE
• System architecture design
• Technical debt assessment
• Performance optimization
• Code review and best practices`,
    DE: `ENTWICKLUNGSDIENSTE

FULL-STACK-ENTWICKLUNG
• React, Vue.js, Angular Frontend-Entwicklung
• Node.js, Python, Go Backend-Entwicklung
• REST API und GraphQL-Entwicklung
• Datenbank-Design und Optimierung

DEVOPS & AUTOMATISIERUNG
• CI/CD-Pipeline-Implementierung
• Infrastructure as Code (Terraform, Ansible)
• Container-Orchestrierung mit Kubernetes
• Monitoring- und Observability-Lösungen

BLOCKCHAIN-ENTWICKLUNG
• Smart-Contract-Entwicklung (Solidity, Rust)
• DeFi-Protokoll-Implementierung
• NFT-Marketplace-Entwicklung
• Kryptowährungs-Wallet-Integration

BERATUNG & ARCHITEKTUR
• Systemarchitektur-Design
• Technische Schulden-Bewertung
• Performance-Optimierung
• Code-Review und Best Practices`
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
