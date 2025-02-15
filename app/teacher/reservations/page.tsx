"use client";
import {useCallback, useEffect, useState} from 'react';
import RoomAvailabilityCalendar from '@components/calendar/RoomAvailabilityCalendar';
import {ClassRoomDto, ReservationDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {Button, Dialog} from "@radix-ui/themes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {SaveComponentProps, SetField} from "@components/common/listingPage";
import SaveReservation from "@/app/admin/reservations/SaveReservation";

const ReservationPage = () => {
  const [reservations, setReservations] = useState<ReservationDto[]>([]);
  const {reservationApi, classRoomApi} = useApis();
  const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<{ start: Date, end: Date } | undefined>(undefined);
  const [classrooms, setClassrooms] = useState<ClassRoomDto[]>([]);
  const [reservation, setReservation] = useState<ReservationDto>({id: 0, type: "NONE"});
  useEffect(() => {
    reservationApi.getAllReservations().then(value => setReservations(value));
  }, [reservationApi]);

  useEffect(() => {
    setReservation(prevState => ({...prevState, startTime: selectedDate?.start, endTime: selectedDate?.end}))
  }, [selectedDate]);


  const handleOnDateSelect = useCallback((arg: {
    start: Date, end: Date
  }) => {
    setSelectedDate(arg);
    setCreateDialogOpen(true);
  }, []);

  useEffect(() => {
    classRoomApi.listClassRoom().then(value => setClassrooms(value));
  }, [classRoomApi]);
  const SaveComponent = useCallback((props: SaveComponentProps<ReservationDto>) => <SaveReservation groups={[]}
                                                                                                    semesters={[]}
                                                                                                    courses={[]}
                                                                                                    classes={[]}
                                                                                                    classrooms={classrooms}
                                                                                                    editMode={true} {...props}/>, [classrooms, selectedDate]);

  const setField = useCallback<SetField<ReservationDto>>((field, value) => {
    setReservation(prev => prev ? ({...prev, [field]: value}) : prev)
  }, [setReservation])

  const create = useCallback(() => {
    reservationApi.createReservation({reservationDto: reservation})
      .then(value => setReservations(prevState => ([...prevState, value])));
  }, [reservation, reservationApi])

  return (
    <div className="p-6">
      {createDialogOpen && <Dialog.Root open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <Dialog.Trigger>
              <Button><FontAwesomeIcon icon={faPlus}/> Create Reservation</Button>
          </Dialog.Trigger>
          <Dialog.Content maxWidth={"1000px"}>
              <Dialog.Title>Create resevation</Dialog.Title>

              <SaveComponent selected={reservation} setField={setField}/>

              <div className="flex justify-end gap-3 mt-4">
                  <Dialog.Close>
                      <Button variant="soft" color="gray">
                          Cancel
                      </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                      <Button onClick={create}> Create Reservation</Button>
                  </Dialog.Close>
              </div>
          </Dialog.Content>
      </Dialog.Root>}
      <div className="mt-8">
        <RoomAvailabilityCalendar events={reservations.map(reservation => ({
          title: `Class room : ${reservation.classRoomNumber}`,
          groupId: reservation.classRoomNumber,
          start: reservation.startTime,
          end: reservation.endTime
        }))} onDateSelect={arg => handleOnDateSelect(arg)}/>
      </div>
    </div>
  );
};

export default ReservationPage;