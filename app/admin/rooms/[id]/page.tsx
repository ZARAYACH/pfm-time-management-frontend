"use client"; // Indique que c'est un composant client
import {use, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import RoomForm from '@/app/components/forms/RoomForm'; // Utilisez des alias pour les chemins
import { Room } from '@/app/types/types';

const RoomEditPage = ({params}: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [room, setRoom] = useState<Room | null>(null);
  const props = use(params);

  useEffect(() => {
    if (props.id) {
      // Simulation de données en attendant le backend
      const mockRooms: Room[] = [
        { id: "1", name: "Salle A", capacity: 30, equipment: ["Projecteur", "Tableau"] },
        { id: "2", name: "Salle B", capacity: 50, equipment: ["Ordinateurs"] },
      ];
      const foundRoom = mockRooms.find(r => r.id === props.id);
      setRoom(foundRoom || null);
    }
  }, [props.id]);

  const handleSubmit = async (data: Room) => {
    await fetch(`/api/rooms/${props.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    router.push('/admin/rooms');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Éditer la Salle</h1>
      {room && <RoomForm onSubmit={handleSubmit} initialData={room} />}
    </div>
  );
};

export default RoomEditPage;