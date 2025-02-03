"use client"; // Indique que c'est un composant client
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ModuleForm from '@/components/forms/ModuleForm';
import { Module } from '@/types/types';

const ModuleEditPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [module, setModule] = useState<Module | null>(null);

  useEffect(() => {
    if (params.id) {
      // Simulation de données en attendant le backend
      const mockModules: Module[] = [
        { id: "1", name: "Mathématiques", semester: "S1" },
        { id: "2", name: "Physique", semester: "S2" },
      ];
      const foundModule = mockModules.find(m => m.id === params.id);
      setModule(foundModule || null);
    }
  }, [params.id]);

  const handleSubmit = async (data: Module) => {
    await fetch(`/api/modules/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    router.push('/admin/modules');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Éditer le Module</h1>
      {module && <ModuleForm onSubmit={handleSubmit} initialData={module} />}
    </div>
  );
};

export default ModuleEditPage;