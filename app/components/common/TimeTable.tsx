'use client';

import React from 'react';
import {Table} from "@radix-ui/themes";
import {TimeTableDto} from "@/app/openapi";

const Timetable: React.FC<{ timetable?: TimeTableDto }> = ({timetable = {days: {}} as TimeTableDto}) => {
  const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const timeSlotsOrder = ['MORNING_FIRST', 'MORNING_SECOND', 'AFTERNOON_FIRST', 'AFTERNOON_SECOND'];

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Day</Table.ColumnHeaderCell>
          {timeSlotsOrder.map((slot) => (
            <Table.ColumnHeaderCell key={slot} className="border border-gray-300 p-2 text-center">
              {slot.replace("_", " ")}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {daysOfWeek.map((day) => (
          <Table.Row key={day}>
            <Table.Cell className="border border-gray-300 p-2 font-bold">{day}</Table.Cell>
            {timeSlotsOrder.map((slot) => {
              const slotData = timetable?.days?.[day]?.timeSlots?.[slot];

              return (
                <Table.Cell key={day + slot} className="border border-gray-300 p-2 text-center">
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
