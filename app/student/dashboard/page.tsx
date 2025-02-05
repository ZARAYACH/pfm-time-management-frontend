"use client";
import { useAuth } from '@/app/contexts/AuthContext';
import TimetableCalendar from '@components/calendar/TimetableCalendar';
import NotificationBell from '@components/common/NotificationBell';
import Navbar from "@components/common/Navbar";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <Navbar/>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bienvenue, {user?.firstName} {user?.lastName}</h1>
        <NotificationBell />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <TimetableCalendar />
      </div>
    </div>
  );
};

export default StudentDashboard;