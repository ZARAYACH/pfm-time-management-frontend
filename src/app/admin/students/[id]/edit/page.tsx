"use client";
//import { useParams } from "next/navigation";

const EditStudentPage = () => {
  //const { id } = useParams();

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
      <h1 className="text-2xl font-bold">Modifier l&apos;étudiant</h1>
      <form className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block font-bold mb-2">Nom</label>
          <input
            type="text"
            defaultValue={student.name}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Classe</label>
          <input
            type="text"
            defaultValue={student.class}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Email</label>
          <input
            type="email"
            defaultValue={student.email}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-bold mb-2">Téléphone</label>
          <input
            type="tel"
            defaultValue={student.phone}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditStudentPage;