import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/providers/theme-provider';
import { AuthProvider } from '@/providers/auth-provider';
import { QueryProvider } from '@/providers/query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'ContentStudio — AI-Powered Content Generation',
  description:
    'Create stunning blog posts, emails, social media captions, and more with AI. Powered by Claude.',
  keywords: [
    'AI content generator',
    'content creation',
    'blog writing',
    'email writing',
    'social media',
    'copywriting',
    'AI writing assistant',
  ],
  openGraph: {
    title: 'ContentStudio — AI-Powered Content Generation',
    description:
      'Create stunning blog posts, emails, social media captions, and more with AI.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              {children}
              <Toaster
                position="bottom-right"
                toastOptions={{
                  className:
                    'glass-card text-text-primary-light dark:text-text-primary-dark',
                }}
              />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
