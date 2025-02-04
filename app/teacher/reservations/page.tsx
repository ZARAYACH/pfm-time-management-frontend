"use client";
import { useState } from 'react';
import ReservationForm from '@components/forms/ReservationForm';
import RoomAvailabilityCalendar from '@components/calendar/RoomAvailabilityCalendar';
import { ReservationRequest } from '@/app/types/types';
import ConflictAlertModal from '@components/forms/ConflictAlertModal';

const ReservationPage = () => {
  const [conflict, setConflict] = useState<string | null>(null);

  const handleSubmit = async (data: ReservationRequest) => {
    try {
      // Appel API pour vérifier les conflits
      const response = await fetch('/api/reservations/check', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        // Enregistrer la réservation
        await fetch('/api/reservations', { method: 'POST', body: JSON.stringify(data) });
        alert('Réservation réussie !');
      } else {
        const error = await response.json();
        setConflict(error.message); // Afficher un conflit
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Réserver une Salle</h1>
      <ReservationForm onSubmit={handleSubmit} />
      {conflict && <ConflictAlertModal message={conflict} onClose={() => setConflict(null)} />}
      <div className="mt-8">
        <RoomAvailabilityCalendar />
      </div>
    </div>
  );
};

export default ReservationPage;