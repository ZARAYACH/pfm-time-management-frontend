"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStudents } from "../../../contexts/StudentsContext";

const AddStudentPage = () => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const { students, setStudents } = useStudents();
  const router = useRouter();

  // Utilisation de useEffect pour s'assurer que le composant est monté
  useEffect(() => {
    setIsMounted(true); // Le composant est monté
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple
    if (!name || !className) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const newStudent = { id: students.length + 1, name, class: className };
    setStudents([...students, newStudent]);

    router.push("/admin/students");
  };

  // Si le composant n'est pas monté, on ne rend rien (évite les appels côté serveur)
  if (!isMounted) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Ajouter un étudiant</h1>
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold">Nom</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="class" className="block text-sm font-semibold">Classe</label>
          <input
            type="text"
            id="class"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddStudentPage;
