import { DM_Sans, DM_Mono } from 'next/font/google';
import WhatsAppButton from '@/components/WhatsAppButton/WhatsAppButton';
import OrganizationJsonLd from '@/components/JsonLd/JsonLd';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
  preload: false,
});

export const metadata = {
  title: 'Coquinaria app — Tu cocina, bajo control',
  description:
    'Compras, costos, recetas y stock centralizados y siempre actualizados, para decidir con datos.',
  keywords: [
    'app para restaurantes',
    'gastronomia',
    'gestion de costos',
    'control de albaranes',
    'recetas de cocina',
    'márgenes de restaurante',
  ],
  authors: [{ name: 'Coquinaria app' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Coquinaria app — Tu cocina, bajo control',
    description:
      'Tu cocina, bajo control desde una sola pantalla.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://costos-app-pi.vercel.app',
    siteName: 'Coquinaria App',
  },
  metadataBase: new URL('https://costos-app-pi.vercel.app'),
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${dmMono.variable}`} data-scroll-behavior="smooth">
      <head>
        <OrganizationJsonLd />
      </head>
      <body style={{ fontFamily: 'var(--font-sans), "Helvetica Neue", Arial, sans-serif' }}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
