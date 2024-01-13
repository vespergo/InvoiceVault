import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { ThemeProvider } from './contexts/theme';

export const metadata: Metadata = {
  title: {
    template: '%s | IV Dashboard',
    default: 'Invoice Vault Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className={`${inter.className} antialiased`}>{children}</body>
        
      </ThemeProvider>
    </html>
  );
}
