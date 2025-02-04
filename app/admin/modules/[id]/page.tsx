"use client"; // Indique que c'est un composant client
import {use, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import ModuleForm from '@/app/components/forms/ModuleForm';
import {Module} from '@/app/types/types';


const ModuleEditPage = ({params}: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [module, setModule] = useState<Module | null>(null);
  const props = use(params);
  useEffect(() => {
    if (props.id) {
      // Simulation de données en attendant le backend
      const mockModules: Module[] = [
        {id: 1, name: "Mathématiques", semester: "S1"},
        {id: 2, name: "Physique", semester: "S2"},
      ];
      const foundModule = mockModules.find(m => m.id === Number(props.id));
      setModule(foundModule || null);
    }
  }, [props.id]);

  const handleSubmit = async (data: Module) => {
    await fetch(`/api/modules/${props.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    router.push('/admin/modules');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Éditer le Module</h1>
      {module && <ModuleForm onSubmit={handleSubmit} initialData={module}/>}
    </div>
  );
};

export default ModuleEditPage;