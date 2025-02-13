"use client"
import {useCallback, useEffect, useMemo, useState} from "react";
import useApis from "@/app/contexts/ApiContext";
import {AcademicClassDto, ClassRoomDto, CourseDto, GroupDto, ReservationDto, SemesterDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveReservation from "@/app/admin/reservations/SaveReservation";

const defaultReservation: ReservationDto = {id: 0};

const ReservationPage = () => {
  const {
    reservationApi,
    courseApi,
    groupApi,
    classRoomApi,
    semesterApi,
    usersApi,
    academicClassApi,
    timeTablesApi
  } = useApis();

  const [classes, setClasses] = useState<AcademicClassDto[]>([]);
  const [semesters, setSemesters] = useState<SemesterDto[]>([]);
  const [courses, setCourse] = useState<CourseDto[]>([]);
  const [groups, setGroups] = useState<GroupDto[]>([]);
  const [classrooms, setClassrooms] = useState<ClassRoomDto[]>([]);

  useEffect(() => {
    groupApi.listGroup().then(value => setGroups(value));
    semesterApi.listSemester().then(value => setSemesters(value));
    courseApi.listCourse().then(value => setCourse(value));
    academicClassApi.listAcademicClass().then(value => setClasses(value));
    classRoomApi.listClassRoom().then(value => setClassrooms(value));
  }, [academicClassApi, courseApi, groupApi, semesterApi, timeTablesApi, usersApi]);

  const SaveComponent = useCallback((props: SaveComponentProps<ReservationDto>) => <SaveReservation classes={classes}
                                                                                                    classrooms={classrooms}
                                                                                                    semesters={semesters}
                                                                                                    groups={groups}
                                                                                                    courses={courses}
                                                                                                    selected={defaultReservation}
                                                                                                    editMode={true} {...props}/>, [classes, courses, groups, semesters])

  const columns = useMemo<ColumnDef<ReservationDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'classroom',
    accessorKey: 'classroomId',
    header: 'classroom',
  }, {
    id: 'type',
    accessorKey: "type",
    header: 'type ',
  }, {
    id: 'start time',
    accessorFn: row => row.startTime?.toLocaleString("en-US"),
    header: 'start time ',
  }, {
    id: 'end time',
    accessorFn: row => row.endTime?.toLocaleString("en-US"),
    header: 'end time ',
  }, {
    id: 'reserved By',
    accessorKey: 'reservedBy',
    header: ' reserved by ',
  }, {
    id: 'recurring',
    accessorKey: 'recurring',
    header: 'recurring',
  }, {
    id: 'recurrence End Date',
    accessorFn: row => row.recurrenceEndDate?.toLocaleString("en-US"),
    header: 'recurrence End Date',
  }, {
    id: 'recurrenceCount',
    accessorKey: 'recurrenceCount',
    header: 'recurrenceCount',
  }], []);

  return (
    <div className="p-6">
      <ListingPage<ReservationDto>
        columns={columns}
        sortBy={[{id: 'id', desc: true}]}
        listItems={() => reservationApi.getAllReservations()}
        resourceName="Reservations"
        defaultPayload={defaultReservation}
        SaveComponent={SaveComponent}
        createItem={payload => reservationApi.createReservation({reservationDto: payload})}
        deleteItem={payload => {
          const ids = new Set<number>();
          ids.add(payload.id);
          return reservationApi.deleteReservations({ids: ids, deleteRecurrences: true})
        }}>
      </ListingPage>
    </div>
  );
};

export default ReservationPage;