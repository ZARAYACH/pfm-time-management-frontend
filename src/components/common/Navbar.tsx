"use client";
import Link from "next/link";
import { useAuth } from "../../app/contexts/AuthContext";
import NotificationBell from "../common/NotificationBell";
import clsx from "clsx"; // Ajout de clsx pour gérer className proprement

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const { user, logout } = useAuth();

  return (
    <nav className={clsx("bg-blue-600 text-white p-4 sticky top-0 z-50", className)}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Titre du site */}
        <Link href="/" className="text-2xl font-bold">
          TimePlanner
        </Link>

        <div className="flex gap-6 items-center">
          {/* Liens dynamiques selon le rôle */}
          {user?.role === "admin" && <Link href="/admin/dashboard">Admin</Link>}
          {user?.role === "teacher" && <Link href="/teacher/dashboard">Enseignant</Link>}
          {user?.role === "student" && <Link href="/student/dashboard">Étudiant</Link>}

          {/* Notification Bell visible uniquement si l'utilisateur est connecté */}
          {user && <NotificationBell />}

          {/* Gestion de l'authentification */}
          {user ? (
            <button 
              onClick={logout} 
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          ) : (
            <Link href="/auth/login" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
