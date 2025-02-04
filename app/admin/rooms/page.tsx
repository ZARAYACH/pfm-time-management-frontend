"use client";
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {ClassRoomDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import Loader from "@components/common/Loader";

const RoomsPage = () => {
  const {classRoomApi} = useApis();
  const [loading, setLoading] = useState<boolean>(true);
  const [rooms, setRooms] = useState<ClassRoomDto[]>([]);

  useEffect(() => {
    classRoomApi.list5().then(value => setRooms(value)).then(() => setLoading(false));
  })

  return loading ? <Loader/> :
    (
      <div className="p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Gestion des Salles</h1>
          <Link href="/admin/rooms/new" className="bg-green-500 text-white px-4 py-2 rounded">
            + Ajouter une Salle
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rooms.map(room => (
            <div key={room.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">{room.name}</h3>
              <p>Capacité: {room.capacity}</p>
              <Link
                href={`/app/admin/rooms/${room.id}`}
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

export default RoomsPage;
/*"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Room } from '../../../types/types';
import Loader from '../../../components/common/Loader';

const RoomsPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => {
        setRooms(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Gestion des Salles</h1>
        <Link href="/admin/rooms/new" className="bg-green-500 text-white px-4 py-2 rounded">
          + Ajouter une Salle
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rooms.map(room => (
          <div key={room.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold">{room.name}</h3>
            <p>Capacité: {room.capacity}</p>
            <p>Équipement: {room.equipment.join(', ')}</p>
            <Link 
              href={`/admin/rooms/${room.id}`} 
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

export default RoomsPage;*/