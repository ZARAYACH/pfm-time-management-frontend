"use client";
import {useEffect, useState} from 'react';
import TimetableCalendar from '@components/calendar/TimetableCalendar';
import {useAuth} from '@/app/contexts/AuthContext';
import {UserDtoRoleEnum} from "@/app/openapi";

const GlobalTimetable = () => {
  const {user} = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Récupérer l'emploi du temps selon le rôle
    const endpoint = user?.role === UserDtoRoleEnum.Admin
      ? '/api/timetable/all'
      : `/api/timetable}`;

    fetch(endpoint)
      .then(res => res.json())
      .then(setEvents);
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Emploi du Temps Global</h1>
      <TimetableCalendar events={events}/>
    </div>
  );
};

export default GlobalTimetable;