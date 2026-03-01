# ContentStudio — AI-Powered Content Generation Platform

A full-stack AI content generation platform built with Next.js, Tailwind CSS, Supabase, and the Anthropic Claude API. Generate blog posts, emails, social media captions, product descriptions, ad copy, and more — with real-time streaming output.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514)
- **Database & Auth:** Supabase (PostgreSQL + Auth + RLS)
- **Animations:** Framer Motion
- **Data Fetching:** TanStack Query (React Query)
- **Notifications:** Sonner
- **Icons:** Lucide React

## Features

- **Authentication** — Email/password and Google OAuth via Supabase Auth
- **Content Generation** — 6 content types with tone, length, and audience controls
- **Real-time Streaming** — Watch content generate word by word
- **History** — Save, search, filter, and manage past generations
- **Dashboard** — Usage stats, quick actions, and recent generations
- **Dark/Light Mode** — System preference detection + manual toggle
- **Responsive** — Mobile, tablet, and desktop layouts
- **Animations** — Page transitions, hover effects, and micro-interactions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A [Supabase](https://supabase.com) account
- An [Anthropic](https://console.anthropic.com) API key

### 1. Clone the repository

```bash
git clone <repo-url>
cd ai-content-studio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 4. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the contents of `supabase-schema.sql`
3. Enable Google OAuth (optional):
   - Go to Authentication > Providers > Google
   - Add your Google OAuth credentials
4. Copy your project URL and anon key to `.env.local`

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx            # Sidebar layout
│   │   ├── dashboard/page.tsx
│   │   ├── generate/page.tsx     # Content generation
│   │   ├── history/page.tsx
│   │   └── profile/page.tsx
│   ├── api/
│   │   └── generate/route.ts    # Anthropic streaming API
│   ├── auth/
│   │   └── callback/route.ts    # OAuth callback
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/
│   ├── ui/                      # Button, Input, Card, etc.
│   ├── layout/                  # Sidebar, Navbar
│   ├── generate/                # Content type, tone, length selectors
│   └── history/                 # History card
├── lib/
│   ├── supabase/                # Client, server, middleware
│   ├── anthropic.ts             # Prompt builders
│   └── utils.ts                 # Utility functions
├── hooks/                       # React Query hooks
├── types/                       # TypeScript types
├── providers/                   # Theme, Auth, Query providers
└── middleware.ts                # Auth middleware
```

## Database Schema

The `generations` table stores all generated content with Row Level Security:

| Column             | Type        | Description                    |
|--------------------|-------------|--------------------------------|
| id                 | uuid        | Primary key                    |
| user_id            | uuid        | References auth.users          |
| content_type       | text        | blog-post, email, etc.         |
| tone               | text        | professional, casual, etc.     |
| length             | text        | short, medium, long            |
| topic              | text        | User's topic/subject           |
| additional_context | text        | Optional keywords/context      |
| target_audience    | text        | Optional audience description  |
| generated_content  | text        | AI-generated output            |
| is_saved           | boolean     | Whether user saved the item    |
| created_at         | timestamptz | Creation timestamp             |

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## License

MIT
