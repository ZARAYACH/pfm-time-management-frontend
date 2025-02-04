"use client";
import { useParams } from "next/navigation";
import Link from 'next/link';

const StudentDetailsPage = () => {
  const { id } = useParams();

  // Données factices pour un étudiant
  const student = {
    id: 1,
    name: "Alice Dupont",
    class: "4ème A",
    email: "alice.dupont@example.com",
    phone: "0123456789",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Détails de l&apos;étudiant</h1>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <p>
          <span className="font-bold">Nom :</span> {student.name}
        </p>
        <p>
          <span className="font-bold">Classe :</span> {student.class}
        </p>
        <p>
          <span className="font-bold">Email :</span> {student.email}
        </p>
        <p>
          <span className="font-bold">Téléphone :</span> {student.phone}
        </p>
      </div>
      <div className="mt-6">
        <Link
          href={`/app/admin/students/${id}/edit`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Modifier
        </Link>
      </div>
    </div>
  );
};

export default StudentDetailsPage;