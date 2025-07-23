# Portfolio Terminal Application

## Overview

This is a React-based portfolio application that simulates a macOS desktop environment with a terminal interface. The application presents Markus Maiwald as a strategic technology architect and founder of Maiwald Enterprises BV. The portfolio positions personal projects (custom OS development, TTRPG with SSI/DID) as strategic R&D that demonstrates deep technical capabilities and forward-thinking innovation. The application supports both English and German languages and includes a contact form functionality.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: express-session with PostgreSQL store
- **Development**: Hot module replacement via Vite integration

### Database Schema
- **Users Table**: Basic user authentication (id, username, password)
- **Contacts Table**: Contact form submissions (id, name, email, message, createdAt)
- **Database**: SQLite (database.sqlite file in repository root)  
- **ORM**: Drizzle ORM with better-sqlite3 driver and Zod validation schemas

## Key Components

### Desktop Environment
- **Desktop**: Main container simulating macOS desktop with wallpaper
- **MenuBar**: Top menu bar with language switcher and clock
- **Terminal**: Interactive terminal component with command processing
- **Dock**: Bottom dock with application icons and interactions
- **ContactModal**: Modal dialog for contact form submissions

### Terminal System
- **Command Processing**: Supports Unix-like commands (help, ls, cat, clear, etc.)
- **Content Management**: Strategic brand content organized in sections (about, services, blockchain, cloud, development, projects)
- **Professional Narrative**: Content positions personal projects as strategic R&D rather than hobbies
- **History**: Command history with arrow key navigation
- **Language Support**: Dynamic language switching between English and German

### UI Components
- Comprehensive set of shadcn/ui components including:
  - Form controls (Input, Textarea, Button, Select)
  - Layout components (Card, Dialog, Tabs, Accordion)
  - Feedback components (Toast, Alert, Progress)
  - Navigation components (Command, Menubar, Tooltip)

## Data Flow

1. **User Interaction**: User interacts with terminal or dock applications
2. **Command Processing**: Terminal processes commands and displays appropriate content
3. **Content Display**: Multilingual content is fetched and displayed based on current language
4. **Contact Form**: Form submissions are validated and sent to the backend API
5. **Database Storage**: Contact submissions are stored in PostgreSQL database
6. **State Management**: React Query manages server state and caching

## External Dependencies

### Frontend Dependencies
- **@radix-ui**: Comprehensive UI primitive components
- **@tanstack/react-query**: Server state management and caching
- **tailwindcss**: Utility-first CSS framework
- **wouter**: Lightweight routing library
- **date-fns**: Date manipulation utilities
- **clsx**: Conditional className utility

### Backend Dependencies
- **express**: Web application framework
- **drizzle-orm**: Type-safe ORM for SQLite
- **better-sqlite3**: High-performance SQLite driver
- **zod**: Runtime type validation

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **esbuild**: Fast JavaScript bundler for production
- **tsx**: TypeScript execution for Node.js

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution with file watching
- **Database**: PostgreSQL with Drizzle migrations
- **Environment**: Replit-specific plugins for development experience

### Production Build
- **Frontend**: Vite build with optimized assets
- **Backend**: esbuild compilation to ESM bundle
- **Database**: Drizzle push for schema synchronization
- **Deployment**: Single Node.js process serving both frontend and API

### Environment Configuration
- **NODE_ENV**: Environment mode (development/production)
- **Database**: SQLite file (database.sqlite) - automatically created on first run
- **Session Management**: In-memory session store for development

## Changelog

```
Changelog:
- July 23, 2025. Universal cyberpunk audio system implementation:
  * Created CyberpunkAudio class with Web Audio API for synthetic cyberpunk sound generation
  * Added hover sounds (800Hz->400Hz square wave with high-pass filter, 80ms duration)
  * Added click sounds (dual oscillator: 1200Hz square + 300Hz sawtooth with band-pass filter)
  * Applied audio effects to ALL clickable elements across the entire interface:
    - All dock icons (Terminal, Contact, Services, Blockchain, Cloud, Projects, Dev, Calc, Editor, Help)
    - MenuBar elements (email contact link and language toggle)
    - Modal close buttons (InfoModal, ContactModal, Terminal)
    - Contact form submit button with disabled state handling
    - All URL links within InfoModal content sections
    - ScrollProgress navigation dots for section switching
    - Calculator buttons (numbers, operators, and window controls)
  * Implemented proper audio context initialization for browser compatibility
  * Every interactive element now provides immersive cyberpunk audio feedback on hover and click
- July 23, 2025. Successfully fixed subtitle visibility and styling in Services/Manifesto section:
  * RESOLVED: Subtitle disappearing issue - now displays consistently and permanently
  * Applied elegant cyberpunk styling with electric blue (#00d4ff) glow and dual-layer text shadow
  * Removed debug elements and styling artifacts for clean professional appearance
  * Subtitle displays properly in both languages: ".. we build the infrastructure your business runs on!" / ".. wir bauen die Infrastruktur, auf der Ihr Unternehmen läuft!"
  * Enhanced typography with Space Grotesk font family and optimized letter spacing (0.05em)
  * User confirmed: "now it works!" - subtitle functionality fully operational
- July 23, 2025. Manifesto section multilingual content and philosophical refinement:
  * Updated manifesto English content with powerful rebellious anarchist messaging
  * Enhanced Core Philosophy: "We architect for digital sovereignty" and strategic autonomy focus
  * Strategic Vision: "Digital fortresses in a world of fragile platforms" with cryptographic hardness
  * The Forge: "Proof in Fire" - functional weapons for digital sovereignty vs theoretical research
  * Fixed manifesto language switching - now fully translates between EN/DE
  * Company subtitle properly displays with typewriter effect in both languages
  * Matrix background animation fixed with proper keyframes for modal displays
- July 23, 2025. Legal compliance section and navigation alignment:
  * Added complete Dutch legal compliance section with Informatieplicht and Privacyverklaring
  * Integrated real company data: Maiwald Enterprises B.V., KVK 78035902, BTW NL861240716B01
  * Updated navigation to include LEGAL section as 5th menu item
  * Right-aligned navigation items with text-first, dot-second layout for better organization
  * Fixed language key mapping issue for proper EN/DE content switching
  * Added complete contact information and GDPR-compliant privacy policy
- July 23, 2025. Performance optimization and Matrix background implementation:
  * Replaced resource-intensive particle effects with lightweight blue Matrix rain
  * Created authentic Matrix background with falling binary digits (0s and 1s) in blue
  * Optimized Canvas-based animation with proper z-indexing and opacity
  * Added terminal close button functionality with cyberpunk styling
  * Terminal can be closed with × button and reopened via dock icon
  * Improved audio initialization logging system for better debugging
  * Performance significantly improved while maintaining cyberpunk aesthetic
- July 23, 2025. Desktop applications and file system simulation:
  * Created Calculator application with full arithmetic functionality and cyberpunk styling
  * Built TextEditor with multi-tab support, file operations, and clipboard integration
  * Added both applications to dock with custom icons (≡ for calc, ⌨ for editor)
  * Integrated file system simulation with Unix commands (ls, cd, pwd, cat, ll)
  * Applications support ESC key closing and window controls (minimize, close)
  * File system contains realistic directory structure with portfolio content
  * Removed Azure Services section from Cloud content per user request
- July 23, 2025. Comprehensive cyberpunk interface transformation:
  * Implemented full dark cyberpunk theme with #121212 backgrounds and electric blue/neon magenta accents
  * Added Framer Motion animations and interactive motion effects throughout interface
  * Created Terminal Ritual sequence - immersive startup experience simulating OS initialization
  * Built ProjectShowcase component with detailed project cards and modal overlays
  * Integrated particle field background effects and scroll progress navigation
  * Enhanced typography with Space Grotesk, Orbitron, and JetBrains Mono fonts
  * Added custom cursor effects, scan lines, data streams, and glitch text animations
  * Implemented dynamic view switching between Terminal, Projects, and Manifesto sections
  * Created cyberpunk-styled dock with geometric icons and gradient effects
  * Enhanced MenuBar with system status indicators and glowing elements
  * Configured Gmail SMTP for contact form notifications (markus@maiwald.work)
- July 23, 2025. Integrated strategic brand positioning and professional narrative:
  * Updated main headline to "Maiwald Enterprises BV" with tagline ".. we build the stuff your business runs on!"
  * Transformed portfolio content to position Markus as strategic technology architect
  * Added comprehensive sections: about, services, blockchain, projects, development
  * Enhanced personal projects (OS renamed to NexusOS, TTRPG) as strategic R&D demonstrations
  * Implemented Maiwald Enterprises BV service pillars framework
  * Updated terminal commands to support new content sections
  * Added NexusOS manifesto: "rebellion encoded" with cryptic terminal-style presentation
- July 23, 2025. Converted from PostgreSQL to SQLite for local file-based data storage
- July 07, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```