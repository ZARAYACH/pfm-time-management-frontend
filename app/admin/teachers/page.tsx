"use client"
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Loader from '@components/common/Loader';
import useApis from "@/app/contexts/ApiContext";
import {UserDto} from "@/app/openapi";

const TeachersPage = () => {
  const {usersApi} = useApis();
  const [teachers, setTeachers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);

  // Données mockées (en attendant le backend)
  useEffect(() => {
    usersApi.list().then((res) => {
      setTeachers(res);
      setLoading(false);
    })
  }, [usersApi]);

  if (loading) return <Loader/>;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Enseignants</h1>
        <Link href="/admin/teachers/new" className="bg-green-500 text-white px-4 py-2 rounded">
          + Ajouter un Enseignant
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map(teacher => (
          <div key={teacher.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold">{teacher.firstName} {teacher.lastName}</h3>
            <p>Email: {teacher.email}</p>
            <Link
              href={`/app/admin/teachers/${teacher.id}`}
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

export default TeachersPage;
/*import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Teacher } from '../../../types/types';
import Loader from '../../../components/common/Loader';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/teachers')
      .then(res => res.json())
      .then(data => {
        setTeachers(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Enseignants</h1>
        <Link href="/admin/teachers/new" className="bg-green-500 text-white px-4 py-2 rounded">
          + Ajouter un Enseignant
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map(teacher => (
          <div key={teacher.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold">{teacher.name}</h3>
            <p>Email: {teacher.email}</p>
            <Link 
              href={`/admin/teachers/${teacher.id}`} 
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

export default TeachersPage;*/