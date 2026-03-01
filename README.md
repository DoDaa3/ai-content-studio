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

- **Node.js 18+** — Download from [nodejs.org](https://nodejs.org)
- **npm** (comes with Node.js) or **yarn**
- **Supabase account** — Free tier at [supabase.com](https://supabase.com)
- **Anthropic API key** — Get one at [console.anthropic.com](https://console.anthropic.com)

---

### Step 1: Clone and install

```bash
git clone <repo-url>
cd ai-content-studio
npm install
```

---

### Step 2: Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account)
2. Click **"New Project"**
3. Fill in:
   - **Name:** `content-studio` (or whatever you like)
   - **Database Password:** Choose a strong password (save it somewhere safe)
   - **Region:** Pick the one closest to you
4. Click **"Create new project"** and wait ~2 minutes for it to provision

---

### Step 3: Get your Supabase credentials

Once your project is ready:

1. Go to **Project Settings** (gear icon in the left sidebar)
2. Click **API** in the settings menu
3. You'll see two values you need:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon / public key** — a long string starting with `eyJ...`

Keep this page open — you'll need these values in Step 5.

---

### Step 4: Set up the database

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Copy the entire contents of the `supabase-schema.sql` file from this project and paste it into the editor
4. Click **"Run"** (or press Cmd/Ctrl + Enter)

This creates:
- The `generations` table with all required columns
- Database indexes for fast queries
- Row Level Security (RLS) policies so users can only access their own data

You should see "Success. No rows returned" — that means it worked.

**To verify:** Go to **Table Editor** in the sidebar. You should see the `generations` table listed with columns like `id`, `user_id`, `content_type`, `topic`, etc.

---

### Step 5: Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` in your editor and fill in the three values:

```env
# Your Anthropic API key (from console.anthropic.com > API Keys)
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx

# Your Supabase project URL (from Step 3)
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co

# Your Supabase anon key (from Step 3)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

**Where to find each value:**

| Variable | Where to get it |
|----------|----------------|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Project Settings → API → `anon` `public` key |

> **Important:** Never commit `.env.local` to git. It's already in `.gitignore`.

---

### Step 6: Set up authentication

#### Email/Password (enabled by default)

Supabase has email/password auth enabled by default. No extra setup needed — users can sign up and sign in immediately.

> **Note:** By default, Supabase requires email confirmation. For development, you can disable this:
> Go to **Authentication** → **Providers** → **Email** → Toggle off **"Confirm email"**

#### Google OAuth (optional)

To enable "Continue with Google":

1. **Create Google OAuth credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project (or select an existing one)
   - Go to **APIs & Services** → **Credentials**
   - Click **"Create Credentials"** → **"OAuth client ID"**
   - Choose **"Web application"**
   - Add authorized redirect URI: `https://<your-supabase-project>.supabase.co/auth/v1/callback`
   - Copy the **Client ID** and **Client Secret**

2. **Configure in Supabase:**
   - Go to your Supabase dashboard → **Authentication** → **Providers**
   - Find **Google** and toggle it on
   - Paste your **Client ID** and **Client Secret**
   - Click **Save**

---

### Step 7: Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the landing page. Click **"Get Started"** to create an account, then you'll be taken to the dashboard.

---

### Step 8: Verify everything works

1. **Sign up** with an email and password on `/signup`
2. **Go to Dashboard** — you should see the welcome message and quick action cards
3. **Generate content** — click any content type card or go to `/generate`
   - Enter a topic (e.g., "10 Tips for Better Sleep")
   - Select tone and length
   - Click "Generate Content"
   - You should see the AI response streaming in word by word
4. **Save** the generation and check it appears in `/history`
5. **Toggle theme** — use the sun/moon toggle in the sidebar

---

## Deploying to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add the three environment variables in the Vercel project settings:
   - `ANTHROPIC_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

If using Google OAuth, update your Google OAuth redirect URI to include your Vercel domain:
`https://your-app.vercel.app/auth/callback`

And add your Vercel domain to Supabase:
Dashboard → Authentication → URL Configuration → Add `https://your-app.vercel.app` to **Redirect URLs**.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx          # Sign in page
│   │   └── signup/page.tsx         # Sign up page
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Sidebar + navbar layout
│   │   ├── dashboard/page.tsx      # Stats, quick actions, recent items
│   │   ├── generate/page.tsx       # Content generation form + output
│   │   ├── history/page.tsx        # Past generations with search/filter
│   │   └── profile/page.tsx        # Account info + theme settings
│   ├── api/
│   │   └── generate/route.ts       # POST endpoint → Anthropic streaming
│   ├── auth/
│   │   └── callback/route.ts       # OAuth callback handler
│   ├── globals.css                 # Tailwind + custom styles
│   ├── layout.tsx                  # Root layout with providers
│   └── page.tsx                    # Landing page
├── components/
│   ├── ui/                         # Button, Input, Card, Select, etc.
│   ├── layout/                     # Sidebar, Navbar
│   ├── generate/                   # ContentTypeSelector, ToneSelector, etc.
│   └── history/                    # HistoryCard
├── lib/
│   ├── supabase/
│   │   ├── client.ts               # Browser Supabase client
│   │   ├── server.ts               # Server Supabase client
│   │   └── middleware.ts           # Auth session refresh + route protection
│   ├── anthropic.ts                # System/user prompt builders
│   └── utils.ts                    # cn(), formatDate(), countWords(), etc.
├── hooks/
│   └── use-generations.ts          # TanStack Query hooks for CRUD
├── types/
│   └── index.ts                    # All TypeScript types + constants
├── providers/
│   ├── theme-provider.tsx          # Dark/light/system theme context
│   ├── auth-provider.tsx           # Supabase auth state context
│   └── query-provider.tsx          # TanStack Query client
└── middleware.ts                   # Next.js middleware for route protection
```

## Database Schema

The `generations` table stores all generated content with Row Level Security:

| Column             | Type        | Description                    |
|--------------------|-------------|--------------------------------|
| id                 | uuid        | Primary key (auto-generated)   |
| user_id            | uuid        | References auth.users          |
| content_type       | text        | blog-post, email, social-media, product-description, ad-copy, custom |
| tone               | text        | professional, casual, witty, persuasive, friendly, formal |
| length             | text        | short, medium, long            |
| topic              | text        | User's topic/subject           |
| additional_context | text        | Optional keywords/context      |
| target_audience    | text        | Optional audience description  |
| generated_content  | text        | AI-generated output            |
| is_saved           | boolean     | Whether user saved the item    |
| created_at         | timestamptz | Creation timestamp             |

RLS policies ensure each user can only SELECT, INSERT, UPDATE, and DELETE their own rows.

## Scripts

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Missing Supabase URL" error | Make sure `.env.local` exists and has valid values. Restart `npm run dev` after changing env vars. |
| Sign-up doesn't work | Check Supabase Authentication → Providers → Email is enabled. Consider disabling "Confirm email" for development. |
| Google OAuth redirects to error | Verify your redirect URI matches exactly: `https://<project>.supabase.co/auth/v1/callback` |
| AI generation returns 401 | Your `ANTHROPIC_API_KEY` is invalid or expired. Get a new one from console.anthropic.com. |
| AI generation returns 429 | You've hit the Anthropic rate limit. Wait a minute and try again. |
| History page is empty | Content is only saved when you click the "Save" button after generation. |
| Dark mode flickers on load | This is normal on first load — the theme is applied client-side after hydration. |

## License

MIT
