"use client";
import Link from 'next/link';
import {useAuth} from "@/app/contexts/AuthContext";

const AdminDashboard = () => {
  const {user} = useAuth();

  const stats = [
    {title: "Nombre d'enseignants", metric: "45", link: "/admin/teachers"},
    {title: "Nombre de salles", metric: "12", link: "/admin/rooms"},
    {title: "Nombre de modules", metric: "30", link: "/admin/modules"},
    {title: "Étudiants inscrits", metric: "1200", link: "/admin/students"},
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>
      <p className="text-gray-600">Bienvenue, {user?.firstName}</p>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.link}>
            <div className="p-6 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors cursor-pointer">
              <p className="text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.metric}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Actions rapides</h2>
        <div className="flex gap-4 mt-4">
          <Link href="/admin/teachers">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Gérer les enseignants
            </button>
          </Link>
          <Link href="/admin/rooms">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Gérer les salles
            </button>
          </Link>
          <Link href="/admin/modules">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Gérer les modules
            </button>
          </Link>
          <Link href="/admin/student">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Gérer les étudiants
            </button>
          </Link>
        </div>
      </div>

      {/* Dernières activités */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Dernières activités</h2>
        <div className="mt-4 space-y-4">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p>Nouvel enseignant ajouté - Jean Dupont</p>
            <p className="text-sm text-gray-500">Il y a 2 heures</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p>Module &quot;Mathématiques&quot; mis à jour</p>
            <p className="text-sm text-gray-500">Il y a 5 heures</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <p>Nouvelle salle réservée - Salle 101</p>
            <p className="text-sm text-gray-500">Il y a 1 jour</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;