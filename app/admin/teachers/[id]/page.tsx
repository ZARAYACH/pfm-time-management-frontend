"use client"
import { useRouter } from 'next/navigation';
import {use, useEffect, useState} from 'react';
import { Teacher } from '@/app/types/types';

function TeacherDetails({params}: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);
  const props = use(params);

  // Données mockées
  const mockTeachers: Teacher[] = [
    { id: "1", name: "Marie Curie", email: "marie@example.com" },
    { id: "2", name: "Albert Einstein", email: "albert@example.com" },
  ];

  useEffect(() => {
    if (props.id) {
      // Simuler un délai de chargement
      setTimeout(() => {
        const foundTeacher = mockTeachers.find(t => t.id === props.id);
        setTeacher(foundTeacher || null);
        setLoading(false);
      }, 1000);
    }
  }, [props.id]);

  if (loading) return <div className="p-6">Chargement...</div>;
  if (!teacher) return <div className="p-6 text-red-500">Enseignant non trouvé</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Détails de l&rsquo;enseignant</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Nom</h2>
          <p className="text-gray-700">{teacher.name}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Email</h2>
          <p className="text-gray-700">{teacher.email}</p>
        </div>
        
        <div className="flex gap-4 mt-6">
          <button 
            onClick={() => router.push('/admin/teachers/${id}/edit')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            Retour
          </button>
          
          <button 
            onClick={() => router.push(`/admin/teachers/${props.id}/edit`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetails;
/*import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Teacher } from '@/types/types';

 function TeacherDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/teachers/${id}`)
        .then(res => res.json())
        .then(data => {
          setTeacher(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des données:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (!teacher) return <div>Enseignant non trouvé</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Détails de l&rsquo;enseignant</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Nom</h2>
          <p>{teacher.name}</p>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Email</h2>
          <p>{teacher.email}</p>
        </div>
        
        <div className="space-x-4">
          <button 
            onClick={() => router.push('/admin/teachers')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Retour
          </button>
          
          <button 
            onClick={() => {/* Logique de modification }}*/
           /* className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Modifier
          </button>
        </div>
      </div>
    </div>
  );
}
export default TeacherDetails;*/