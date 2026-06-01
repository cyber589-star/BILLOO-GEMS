import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BILLOO GEMS — Rare & Authentic Gemstones',
  description:
    'Curated collection of ethically sourced, certified gemstones from the world\'s finest mines. Buy, sell, and discover rare gemstones since 2012.',
  keywords: 'gemstones, precious gems, sapphire, ruby, emerald, certified gemstones, luxury jewelry, rare gemstones, buy gemstones online',
  openGraph: {
    title: 'BILLOO GEMS — Rare & Authentic Gemstones',
    description: 'Discover rare and authentic gemstones. Ethically sourced, certified, and hand-selected.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💎</text></svg>" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#2C2C2C] antialiased">
        {children}
      </body>
    </html>
  );
}
