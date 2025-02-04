"use client";
import {useState, useEffect} from 'react';
import TimetableCalendar from '@components/calendar/TimetableCalendar';
import { useAuth } from '@/app/contexts/AuthContext';

const TeacherTimetable = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/teachers/${user.id}/timetable`)
        .then(res => res.json())
        .then(setEvents);
    }
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mon Emploi du Temps</h1>
      <TimetableCalendar events={events} />
    </div>
  );
};

export default TeacherTimetable;