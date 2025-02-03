// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'TimePlanner',
  description: 'Application de gestion des emplois du temps',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}