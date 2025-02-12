"use client";
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';  // Importation du composant Link pour la navigation
import NotificationBell from '../../../components/common/NotificationBell';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bienvenue, {user?.name}</h1>
        <NotificationBell />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Ajout des liens vers l'emploi du temps et la recherche d'emploi */}
        <div className="flex flex-col gap-4">
          <Link 
            href="/student/timetable" 
            className="bg-blue-500 text-white px-4 py-2 rounded text-center"
          >
            Voir mon emploi du temps
          </Link>
          <Link 
            href="/student/search" 
            className="bg-green-500 text-white px-4 py-2 rounded text-center"
          >
            Chercher un emploi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
