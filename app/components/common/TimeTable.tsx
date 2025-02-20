'use client';

import React, {useEffect, useState} from 'react';
import {Table} from "@radix-ui/themes";
import {AcademicClassDto, SlotDto, TimeTableDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";

interface TimeTableProps {
  timetable?: TimeTableDto,
  academicClasses: AcademicClassDto[]
}

const Timetable = ({timetable = {days: {}} as TimeTableDto, academicClasses = []}: TimeTableProps) => {
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
                      {academicClasses.find(value => value.id == slotData.academicClassId) ?
                        (<>
                          <p>Class Name
                            : {academicClasses.find(value => value.id == slotData.academicClassId)?.courseName}</p>
                          <p>{'Group name :' + academicClasses.find(value => value.id == slotData.academicClassId)?.groupName}</p>
                        </>) : <p>Class ID: {slotData.academicClassId}</p>}
                    </>
                  ) : (
                    "—"
                  )}
                </Table.Cell>
              )
            })}
          </Table.Row>))}

      </Table.Body>
    </Table.Root>

  );
};

export default Timetable;
