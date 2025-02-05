// app/layout.tsx
import './globals.css';
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "@/app/contexts/AuthContext";

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
    <AuthProvider>
      <body className="bg-gray-50">{children}
      <ToastContainer/>
      </body>
    </AuthProvider>
    </html>

  );
}