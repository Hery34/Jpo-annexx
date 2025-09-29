# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application built for "Journées Portes Ouvertes Marseille EST" (Open House Days), designed to manage visitor registrations for an event. The app uses:

- **Next.js 15+** with App Router and React 19
- **Supabase** for authentication and database (visitor management)
- **shadcn/ui** components with Tailwind CSS styling
- **TypeScript** throughout the codebase

## Core Architecture

### Authentication Flow
The app implements Supabase cookie-based authentication:
- **Middleware**: `middleware.ts` handles session management across all routes using `lib/supabase/middleware.ts`
- **Server Client**: `lib/supabase/server.ts` creates server-side Supabase clients for Server Components and API routes
- **Client**: `lib/supabase/client.ts` for client-side operations
- **Protected Routes**: `/protected/*` routes require authentication

### Data Layer
- **Visitor Types**: Defined in `lib/types/visiteur.ts` with interfaces for `Visiteur`, `VisiteurInsert`, and `VisiteurFormData`
- **Database Operations**: `lib/supabase/visiteurs.ts` contains visitor-related database functions
- Main functionality centers around visitor registration and management

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

## Environment Setup

Required environment variables (see `.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Key Directories

- `/app` - Next.js App Router pages and layouts
- `/app/auth` - Authentication pages (login, signup, etc.)
- `/app/protected` - Protected routes requiring authentication
- `/components` - Reusable UI components including shadcn/ui
- `/lib` - Utility functions, Supabase clients, and type definitions
- `/public` - Static assets including company logos

## Important Implementation Notes

- Always create new Supabase server clients within functions (don't use globals)
- Authentication state is managed through cookies and middleware
- The app is specifically branded for "Annexx" company events
- UI uses red branding colors (`red-600`, `red-700`) for company theming