"use client";
import {useState} from 'react';
import {useAuth} from '@/app/contexts/AuthContext';

const StudentSearchPage = () => {
  const [filiere, setFiliere] = useState('');
  const [niveau, setNiveau] = useState('');
  const {user} = useAuth();

  const handleSearch = () => {
    // Utilisation des valeurs dans la recherche
    console.log('Recherche avec:', {filiere, niveau, user});
    // Ajouter ici la logique de recherche avec les paramètres
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Recherche d&apos;Emploi du Temps</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Filière"
            className="form-input"
            onChange={(e) => setFiliere(e.target.value)}
            value={filiere} // Ajout pour contrôle du formulaire
          />
          <select
            className="form-input"
            onChange={(e) => setNiveau(e.target.value)}
            value={niveau} // Ajout pour contrôle du formulaire
          >
            <option value="">Niveau</option>
            <option value="L1">Licence 1</option>
            <option value="L2">Licence 2</option>
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Rechercher
        </button>
      </div>
    </div>
  );
};

export default StudentSearchPage;