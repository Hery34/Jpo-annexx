# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application built for "Journées Portes Ouvertes Marseille EST" (Open House Days), designed to manage visitor registrations for an event. The app uses:

- **Next.js 15+** with App Router and React 19
- **Supabase** for database (visitor management)
- **shadcn/ui** components with Tailwind CSS styling
- **TypeScript** throughout the codebase

## Core Architecture

### Data Layer
- **Visitor Types**: Defined in `lib/types/visiteur.ts` with interfaces for `Visiteur`, `VisiteurInsert`, and `VisiteurFormData`
- **Database Operations**: `lib/supabase/visiteurs.ts` contains visitor-related database functions:
  - `insertVisiteur()` - Add new visitor
  - `getVisiteurs()` - Retrieve all visitors (ordered by creation date)
  - `getEmailsExistants()` - Get existing emails for duplicate checking
  - `getVisiteurById()` - Retrieve single visitor by ID
- **Database Table**: `visiteurs` table stores visitor information (entreprise, nom, prenom, telephone, email, adresse, note)
- **Supabase Client**: `lib/supabase/client.ts` for client-side operations

### UI Structure
- **Layout**: French language (`lang="fr"`) with Geist font
- **Components**: Built with shadcn/ui (New York style) using Tailwind CSS variables
- **Styling**: Tailwind config with shadcn/ui design tokens and CSS variables
- **Icons**: Lucide React icon library

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build the application
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

The app runs on [localhost:3000](http://localhost:3000) by default.

## Environment Setup

Required environment variables (see `.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Key Directories

- `/app` - Next.js App Router pages and layouts
- `/app/visiteurs` - Visitors list page
- `/components` - Reusable UI components including shadcn/ui
- `/lib` - Utility functions, Supabase clients, and type definitions
- `/public` - Static assets including company logos

## Key Application Features

### Main Pages
- **Home (`/`)**: Landing page with visitor registration form
- **Visitors List (`/visiteurs`)**: View all registered visitors

### Core Components
- **visiteur-form.tsx**: Main visitor registration form with client-side validation
- **visiteurs-list.tsx**: Display and manage visitor records

## Important Implementation Notes

- This is a public application without authentication
- The app is specifically branded for "Annexx" company events
- UI uses red branding colors (`red-600`, `red-700`) for company theming
- All user-facing text is in French
- Path aliases use `@/*` format (configured in `tsconfig.json`)
