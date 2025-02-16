"use client";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import {EventInput} from '@fullcalendar/core';

type TimetableCalendarProps = {
  events?: EventInput[];
};

const TimetableCalendar = ({events}: TimetableCalendarProps) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      events={events}
      locale={frLocale}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      eventContent={(eventInfo) => (
        <div className="p-1">
          <b>{eventInfo.event.title}</b>
          <p>{eventInfo.event.extendedProps.room}</p>
        </div>
      )}
    />
  );
};

export default TimetableCalendar;