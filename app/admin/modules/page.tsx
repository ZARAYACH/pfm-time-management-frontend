//import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Module } from '@/app/types/types';
//import Loader from '../../../components/common/Loader';

const ModulesPage = () => {
  /*const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/modules')
      .then(res => res.json())
      .then(data => {
        setModules(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;*/
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map(module => (
          <div key={module.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg">{module.name}</h3>
            <p className="text-gray-600">Semestre: {module.semester}</p>
            <Link 
              href={`/app/admin/modules/${module.id}`}
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