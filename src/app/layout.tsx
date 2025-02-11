"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { StudentsProvider } from "@/app/contexts/StudentsContext"; // Assure-toi du bon chemin
import "@/app/globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideLayout = pathname === "/auth/login" || pathname === "/auth/register";

  return (
    <html lang="fr" className="h-full">
      <body className="flex flex-col min-h-screen">
        {/* Navbar est affiché sauf sur les pages de connexion et d'inscription */}
        {!hideLayout && <Navbar />}
        <StudentsProvider>
          {/* Contenu principal qui peut grandir */}
          <main className="flex-grow">{children}</main>
        </StudentsProvider>
        {/* Footer est affiché sauf sur les pages de connexion et d'inscription */}
        {!hideLayout && <Footer />}
      </body>
    </html>
  );
};

export default Layout;
