import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/public" className="text-2xl font-bold">TimePlanner</Link>
        
        <div className="flex gap-6 items-center">
          {user?.role === 'admin' && <Link href="/admin/dashboard">Admin</Link>}
          {user?.role === 'teacher' && <Link href="/teacher/dashboard">Enseignant</Link>}
          {user?.role === 'student' && <Link href="/student/dashboard">Étudiant</Link>}
          <NotificationBell />
          {user ? (
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Déconnexion</button>
          ) : (
            <Link href="/auth/login">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;