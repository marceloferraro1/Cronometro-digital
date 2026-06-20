import './globals.css';

export const metadata = {
  title: 'Cronómetro Rolex Digital',
  description: 'Un cronómetro digital de lujo con música y diseño Rolex',
  manifest: '/manifest.json',
  themeColor: '#d4af37',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Cronómetro" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><text x='50%' y='50%' font-size='100' text-anchor='middle' dominant-baseline='middle'>⏱️</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
