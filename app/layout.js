import './globals.css';

export const metadata = {
  title: 'Cronómetro Digital',
  description: 'Un cronómetro digital con capacidad de guardar tiempos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
