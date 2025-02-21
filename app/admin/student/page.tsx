"use client";
import Link from "next/link";

const StudentsPage = () => {
  // Données factices pour les étudiants
  const students = [
    {id: 1, name: "Alice Dupont", class: "4ème A"},
    {id: 2, name: "Bob Martin", class: "3ème B"},
    {id: 3, name: "Charlie Leroy", class: "5ème C"},
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Gestion des étudiants</h1>
      <div className="mt-6">
        <Link
          href="/admin/students/new"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter un étudiant
        </Link>
      </div>
      <div className="mt-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="p-4 bg-white shadow-md rounded-lg mb-4 flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{student.name}</p>
              <p className="text-sm text-gray-600">{student.class}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/app/admin/students/${student.id}/edit`}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Modifier
              </Link>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsPage;