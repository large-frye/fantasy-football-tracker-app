# Fantasy Sports Tracker - Project Setup

## Overview
This project is a modern multi-sport fantasy tracker built with Astro, migrating from a legacy React 15.6.1 application.

## Technology Stack
- **Framework**: Astro 5.x
- **Language**: TypeScript (strict mode)
- **Testing**: Vitest + fast-check (property-based testing)
- **Build Tool**: Vite (bundled with Astro)

## Directory Structure
```
src/
├── components/
│   ├── core/              # Reusable UI components
│   ├── sport/             # Sport-specific components
│   ├── team/              # Team management components
│   └── player/            # Player components
├── layouts/               # Page layouts
├── pages/                 # Astro pages (routes)
├── services/              # Business logic services
├── models/                # TypeScript type definitions
├── utils/                 # Utility functions
└── styles/                # Global styles
```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Configuration Files
- `astro.config.mjs` - Astro configuration with optimized build settings
- `tsconfig.json` - TypeScript configuration (strict mode)
- `vitest.config.ts` - Vitest test configuration

## Next Steps
Refer to `.kiro/specs/fantasy-sports-tracker/tasks.md` for the implementation plan.
