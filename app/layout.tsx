// app/layout.tsx
import './globals.css';
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "@/app/contexts/AuthContext";
import {Theme} from "@radix-ui/themes";
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';

export const metadata = {
  title: 'TimePlanner',
  description: 'Application de gestion des emplois du temps',
};

config.autoAddCss = false;

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
    <body className="bg-gray-50">
    <AuthProvider>
      <Theme>
        {children}
      </Theme>
      <ToastContainer/>
    </AuthProvider>

    </body>
    </html>

  );
}