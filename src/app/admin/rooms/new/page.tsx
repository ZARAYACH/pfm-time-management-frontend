"use client";
import RoomForm from "@/components/forms/RoomForm";
import { Room } from "@/types/types";

const NewRoomPage = () => {
  const handleRoomSubmit = async (data: Omit<Room, "id">) => {
    console.log("Données de la salle :", data);
    // Ajouter ici l'appel API pour créer la salle
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Créer une nouvelle salle</h1>
      <RoomForm onSubmit={handleRoomSubmit} />
    </div>
  );
};

export default NewRoomPage;
