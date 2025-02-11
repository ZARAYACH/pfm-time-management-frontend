"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NewModulePage = () => {
  const router = useRouter();
  const [moduleName, setModuleName] = useState("");

  const handleAddModule = async () => {
    if (!moduleName.trim()) {
      alert("Le nom du module est obligatoire !");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: moduleName }), // Envoi des données au backend
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du module");
      }

      router.push("/admin/modules"); // Redirection vers la liste des modules
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue !");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ajouter un nouveau module</h1>

      <input
        type="text"
        placeholder="Nom du module"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <div className="mt-4 flex gap-4">
        <button
          onClick={handleAddModule}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ajouter
        </button>

        <button
          onClick={() => router.push("/admin/modules")}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default NewModulePage;
