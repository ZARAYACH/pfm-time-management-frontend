import Link from 'next/link';
import { Module } from '../../../types/types';

const ModulesPage = () => {
  const modules: Module[] = [
    { id: "1", name: "Mathématiques", semester: "S1" },
    { id: "2", name: "Physique", semester: "S2" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Modules</h1>
        <Link href="/admin/modules/new" className="bg-green-500 text-white px-4 py-2 rounded">
          + Nouveau Module
        </Link>
      </div>
      
      {/* Ajout d'espace entre les cartes horizontalement et verticalement */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map(module => (
          <div key={module.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-3">{module.name}</h3>
            <p className="text-gray-600 mb-4">Semestre: {module.semester}</p>
            <Link 
              href={`/admin/modules/${module.id}`} 
              className="text-blue-500 mt-2 inline-block"
            >
              Éditer
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesPage;
