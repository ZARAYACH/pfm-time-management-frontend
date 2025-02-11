"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReservationForm from "@/components/forms/ReservationForm";
import { Room, ReservationRequest } from "@/types/types"; // Vérifie que ces types existent

const RoomDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // ✅ Correction du type
  const [room, setRoom] = useState<Room | null>(null); // ✅ Correction du type

  useEffect(() => {
    fetch(`/api/rooms/${id}`)
      .then((res) => res.json())
      .then((data: Room) => setRoom(data)); // ✅ On précise que `data` est de type `Room`
  }, [id]);

  const handleReservationSubmit = async (data: ReservationRequest) => { // ✅ Correction du type
    await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, roomId: id }),
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{room?.name}</h1>
      <p>Capacité : {room?.capacity}</p>

      <h2 className="text-lg font-bold mt-4">Faire une réservation</h2>
      <ReservationForm onSubmit={handleReservationSubmit} />
    </div>
  );
};

export default RoomDetailsPage;
