# Portfolio Terminal Application

## Overview

This is a React-based portfolio application that simulates a macOS desktop environment with a terminal interface. The application presents a professional portfolio in an interactive terminal format, allowing users to navigate through different sections using Unix-like commands. The application supports both English and German languages and includes a contact form functionality.

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
- **Content Management**: Multilingual content system for portfolio sections
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
- July 23, 2025. Converted from PostgreSQL to SQLite for local file-based data storage
- July 07, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```