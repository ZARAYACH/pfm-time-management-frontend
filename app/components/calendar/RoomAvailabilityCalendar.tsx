import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { EventInput } from "@fullcalendar/core";

type RoomAvailabilityCalendarProps = {
  events?: EventInput[];
  onDateSelect?: (arg: { start: Date; end: Date }) => void;
};

const RoomAvailabilityCalendar = ({ 
  events = [], 
  onDateSelect 
}: RoomAvailabilityCalendarProps) => {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        locale={frLocale}
        events={events}
        selectable={true}
        selectMirror={true}
        eventColor="#3b82f6" // Couleur des réservations
        select={(info) => onDateSelect?.({
          start: info.start,
          end: info.end
        })}
        eventContent={(eventInfo) => (
          <div className="p-1 text-sm">
            <div className="font-bold">{eventInfo.event.title}</div>
            <div>{eventInfo.event.extendedProps.teacher}</div>
          </div>
        )}
        headerToolbar={{
          start: "title",
          center: "",
          end: "timeGridWeek,timeGridDay today prev,next"
        }}
      />
    </div>
  );
};

export default RoomAvailabilityCalendar;