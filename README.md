# ADEPT Website

Association pour le Développement et l'Échange des Pratiques Transmédiums - Official Website

## About

ADEPT is a bilingual (FR/EN) arts association website built with Next.js 13, featuring:

- 🎨 Online gallery with e-commerce capabilities
- 🎭 Projects and events management
- 🎵 Music player for sound works
- 🌐 Full bilingual support (French/English)
- 🗄️ Supabase backend for all data
- 🎨 Dark theme with contemporary art aesthetic

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **i18n**: next-intl
- **Fonts**: Inter (UI) + Playfair Display (Display)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Copy .env.example to .env and fill in your Supabase credentials
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### Build

```bash
# Type check
npm run typecheck

# Build for production
npm run build

# Start production server
npm start
```

## Database Setup

The project uses Supabase for data persistence. Database migrations are located in the Supabase migrations (applied via MCP).

### Seeding Data

Sample data for artists, artworks, projects, events, and news has been seeded using SQL directly via the Supabase MCP tools.

## Screenshots

### Generating Homepage Screenshot

To capture a full-page screenshot of the homepage:

```bash
# IMPORTANT: Make sure the dev server is running first
npm run dev

# Then, in another terminal:
npm run snap:home
```

**Note**: The dev server must be running on `http://localhost:3000` before executing the screenshot script.

This will:
1. Install Chromium (if not already installed)
2. Launch a headless browser
3. Navigate to `http://localhost:3000/fr`
4. Wait for the page to fully load
5. Capture a full-page screenshot at 1440×900 viewport
6. Save to `/public/preview-home.png`

### Viewing the Screenshot

Visit `/preview` in your browser (e.g., `http://localhost:3000/fr/preview`) to see the generated screenshot.

## Project Structure

```
.
├── app/
│   └── [locale]/              # Locale-based routing
│       ├── about/             # About page
│       ├── cart/              # Shopping cart
│       ├── contact/           # Contact form
│       ├── donate/            # Support page
│       ├── events/            # Events listing & detail
│       ├── gallery/           # Online gallery
│       │   ├── artists/[slug] # Artist profiles
│       │   └── artworks/[slug]# Artwork details
│       ├── legal/             # Legal notice
│       ├── music/             # Music player
│       ├── preview/           # Screenshot preview
│       ├── privacy/           # Privacy policy
│       ├── projects/          # Projects listing & detail
│       └── page.tsx           # Homepage
├── components/
│   ├── gallery/               # Gallery components
│   ├── layout/                # Header, Footer, Language Switcher
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── database.types.ts      # Supabase TypeScript types
│   ├── supabase.ts            # Supabase client
│   └── utils.ts               # Utility functions
├── messages/                  # i18n translations
│   ├── fr.json                # French
│   └── en.json                # English
├── i18n/
│   └── request.ts             # next-intl configuration
├── scripts/
│   └── snap-home.ts           # Screenshot generation script
└── public/                    # Static assets
    └── preview-home.png       # Homepage screenshot
```

## Content Management

### Adding Artists

Artists are managed in the `artists` table in Supabase. Each artist has:
- Bilingual bio (FR/EN)
- Portrait image
- Disciplines
- Social links (website, Instagram)

### Adding Artworks

Artworks are managed in the `artworks` table with:
- Title, description (bilingual)
- Multiple images
- Dimensions, medium, year
- Pricing and availability
- Edition information
- Tags for filtering

### Adding Projects/Events

Projects and events support bilingual content and are managed through their respective Supabase tables.

## i18n (Internationalization)

The site is fully bilingual (French/English) using next-intl:

- **Default locale**: French (fr)
- **Secondary locale**: English (en)
- **Translation files**: `/messages/{locale}.json`
- **URL structure**: `/{locale}/{page}`

All UI strings are externalized to translation files. To add new translations:

1. Add the key to both `/messages/fr.json` and `/messages/en.json`
2. Use `useTranslations()` hook in client components
3. Use `getTranslations()` in server components

## Design System

### Colors

- **Background**: Pure black (`#000000`)
- **Text**: White (`#FFFFFF`)
- **Gallery Canvas**: Neutral gray for artwork display
- **Accents**: White/10 for borders and subtle backgrounds

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Line height**: 150% for body, 120% for headings

### Layout

- Maximum content width: 7xl (1280px)
- Generous whitespace
- 8px spacing system
- High contrast (WCAG AA compliant)

## License

© 2025 ADEPT. All rights reserved.
