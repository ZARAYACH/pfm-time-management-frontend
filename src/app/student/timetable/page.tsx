"use client";
import { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TimetableCalendar from '../../../components/calendar/TimetableCalendar';
import { useAuth } from '../../contexts/AuthContext';

const StudentTimetable = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/timetable/${user?.classId}`)
      .then((res) => res.json())
      .then(setEvents);
  }, [user]);

  const handleExportPDF = async () => {
    if (!calendarRef.current) return;

    setIsLoading(true);
    
    try {
      const canvas = await html2canvas(calendarRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
      });

      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage({
        imageData: canvas.toDataURL('image/png', 1.0),
        format: 'PNG',
        x: 10,
        y: 10,
        width: imgWidth,
        height: imgHeight,
      });

      pdf.setFontSize(18);
      pdf.text(`Emploi du temps - ${user?.name}`, 140, 20, { align: 'center' });
      pdf.setFontSize(12);
      pdf.text(`Généré le ${new Date().toLocaleDateString()}`, 140, 30, { align: 'center' });

      pdf.save(`emploi-du-temps-${user?.name}.pdf`);
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      alert("Erreur lors de l'export !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Mon Emploi du Temps</h1>
        <button
          onClick={handleExportPDF}
          disabled={isLoading}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Génération en cours...' : 'Exporter en PDF'}
        </button>
      </div>
      
      {/* Ajout de la ref sur le conteneur du calendrier */}
      <div ref={calendarRef} className="bg-white p-4 rounded-lg shadow-md">
        <TimetableCalendar events={events} />
      </div>
    </div>
  );
};

export default StudentTimetable;