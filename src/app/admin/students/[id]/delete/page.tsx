"use client";
import { useParams, useRouter } from "next/navigation";

type Student = {
  id: string;
  name: string;
};

const DeleteStudentPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const handleDelete = () => {
    console.log("ID récupéré :", id); // 🔍 Debug

    if (!id) {
      console.error("Erreur : ID invalide !");
      return;
    }

    // 🔥 Suppression de l'étudiant en localStorage
    let students: Student[] = JSON.parse(localStorage.getItem("students") || "[]");
    students = students.filter((student) => student.id !== id);
    localStorage.setItem("students", JSON.stringify(students));

    console.log(`Étudiant ${id} supprimé !`);
    router.push("/admin/students"); // Redirection après suppression
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Supprimer l&apos;étudiant</h1>
      <p>Êtes-vous sûr de vouloir supprimer l&apos;étudiant avec l&apos;ID : {id} ?</p>
      <div className="mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Oui, supprimer
        </button>
        <button
          onClick={() => router.push("/admin/students")}
          className="bg-gray-500 text-white px-4 py-2 ml-4 rounded hover:bg-gray-600"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default DeleteStudentPage;
