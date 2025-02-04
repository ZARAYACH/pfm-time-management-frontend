//import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';

const TeacherDashboard = () => {
  //const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tableau de Bord Enseignant</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/teacher/reservations">
          <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50">
            <h2 className="text-xl font-semibold">Mes Réservations</h2>
          </div>
        </Link>
        
        <Link href="/teacher/timetable">
          <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-50">
            <h2 className="text-xl font-semibold">Mon Emploi du Temps</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;