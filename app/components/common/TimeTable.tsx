'use client';

import React, {useEffect, useState} from 'react';
import {Table} from "@radix-ui/themes";
import {SlotDto, TimeTableDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";

const Timetable: React.FC<{ timetable?: TimeTableDto }> = ({timetable = {days: {}} as TimeTableDto}) => {
  const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const [timeSlotsOrder, setTimeSlotsOrder] = useState<SlotDto[]>([]);
  const {timeTablesApi} = useApis();

  useEffect(() => {
    timeTablesApi.getTimeSlots().then(value => setTimeSlotsOrder(value))
  }, [timeTablesApi]);

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Day</Table.ColumnHeaderCell>
          {timeSlotsOrder.map((slot, index) => (
            <Table.ColumnHeaderCell key={index} className="border border-gray-300 p-2 text-center">
              From {slot.startTime} <br/>To {slot.endTime}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {daysOfWeek.map((day) => (
          <Table.Row key={day}>
            <Table.Cell className="border border-gray-300 p-2 font-bold">{day}</Table.Cell>
            {timeSlotsOrder.map((slot) => {
              const slotData = timetable?.days?.[day]?.timeSlots?.[slot.slot];

              return (
                <Table.Cell key={day + slot.slot} className="border border-gray-300 p-2 text-center">
                  {slotData?.classRoomId && slotData?.academicClassId ? (
                    <>
                      <p>Classroom: {slotData.classRoomId}</p>
                      <p>Class ID: {slotData.academicClassId}</p>
                    </>
                  ) : (
                    "—"
                  )}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>

  );
};

export default Timetable;
