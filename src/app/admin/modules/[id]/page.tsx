"use client"; // Indique que c'est un composant client
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ModuleForm from '@/components/forms/ModuleForm';
import { Module } from '@/types/types';

const ModuleEditPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [module, setModule] = useState<Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      // Simuler une requête API pour récupérer les données du module
      fetch(`/api/modules/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setModule(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Impossible de charger le module');
          setLoading(false);
        });
    }
  }, [params.id]);

  const handleSubmit = async (data: Module) => {
    try {
      // Envoi des données modifiées au backend
      await fetch(`/api/modules/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      router.push('/admin/modules'); // Redirection vers la page des modules
    } catch {
      setError('Erreur lors de la modification du module');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Éditer le Module</h1>
      {module ? (
        <ModuleForm onSubmit={handleSubmit} initialData={module} />
      ) : (
        <div>Module introuvable</div>
      )}
    </div>
  );
};

export default ModuleEditPage;
