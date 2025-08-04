# Portfolio Terminal Application

## Overview
This React-based portfolio application simulates a macOS desktop with a terminal interface, showcasing Markus Maiwald as a strategic technology architect and founder of Maiwald Enterprises BV. It presents personal projects (custom OS development, TTRPG with SSI/DID) as strategic R&D, demonstrating deep technical capabilities and innovation. The application supports English and German languages, includes a contact form, and integrates an AI chatbot to highlight AI prompting expertise.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming, enhanced with dark cyberpunk theme, Framer Motion animations, particle effects, scan lines, data streams, and glitch text.
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter
- **Key Components**: Desktop, MenuBar, Terminal, Dock, ContactModal, ChatbotApp, Calculator, TextEditor.
- **UI/UX Decisions**: Full dark cyberpunk theme with electric blue/neon magenta accents, custom cursor effects, dynamic view switching, and immersive audio feedback for interactive elements. Features a "Terminal Ritual" startup sequence.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Database**: SQLite with Drizzle ORM
- **Session Management**: express-session with PostgreSQL store (development)
- **Terminal System**: Supports Unix-like commands (help, ls, cat, clear) and real Linux commands with security restrictions (whitelist, sanitization). Content is organized strategically (about, services, blockchain, cloud, development, projects) with a professional narrative.

### Database Schema
- **Tables**: Users (id, username, password), Contacts (id, name, email, message, createdAt).
- **ORM**: Drizzle ORM with better-sqlite3 driver and Zod validation.

### System Design Choices
- **Multilingual Support**: Dynamic language switching for content and interface elements.
- **Content Strategy**: Positions personal projects as strategic R&D. Includes comprehensive sections for services, blockchain, projects, development, and legal compliance (Dutch).
- **Interactive Elements**: Implemented custom cyberpunk audio for all clickable elements, Matrix background animations, and custom cursor tracking.
- **Application Simulation**: Desktop applications like Calculator and Text Editor with file system simulation (ls, cd, pwd, cat, ll).

## External Dependencies
### Frontend Dependencies
- **@radix-ui**: UI primitive components
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