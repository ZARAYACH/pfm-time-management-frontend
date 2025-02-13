"use client"; // Indique que c'est un composant client
import {use, useCallback, useEffect, useState} from 'react';
import {AcademicClassDto, ClassRoomDto, CourseDto, GroupDto, ReservationDto, SemesterDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {SetField} from "@components/common/listingPage";
import PageHeader from "@components/common/PageHeader";
import {Button} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import ItemDetailsSkeleton from "@components/skeletons/itemPageSkeleton";
import SaveReservation from "@/app/admin/reservations/SaveReservation";


const ReservationEditPage = ({params}: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {id} = use(params);
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

  const [reservation, setReservation] = useState<ReservationDto>();
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
  }, [academicClassApi, classRoomApi, courseApi, groupApi, semesterApi, timeTablesApi, usersApi]);
  const setField = useCallback<SetField<ReservationDto>>((field, value) => {
    setReservation(prev => prev ? ({...prev, [field]: value}) : undefined)
  }, [])

  const updateReservation = useCallback(() => {
    if (!reservation?.id) {
      return;
    }
    reservationApi.updateReservation({
      id: reservation.id,
      reservationDto: {
        id: reservation.id,
        type: reservation.type,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
        classId: reservation.classId,
        classroomId: reservation.classroomId,
        reservedBy: reservation.reservedBy,
        parentReservationId: reservation.parentReservationId,
        childReservationIds: reservation.childReservationIds,
        recurrenceCount: reservation.recurrenceCount,
        recurrenceEndDate: reservation.recurrenceEndDate,
        recurring: reservation.recurring

      }
    }).then(() => router.push('/admin/reservations'))
  }, [reservation?.id, reservation?.type, reservation?.startTime, reservation?.endTime, reservation?.classId, reservation?.classroomId, reservation?.reservedBy, reservation?.parentReservationId, reservation?.childReservationIds, reservation?.recurrenceCount, reservation?.recurrenceEndDate, reservation?.recurring, reservationApi, router])

  useEffect(() => {
    reservationApi.getReservationById({id: id}).then(reservation => {
      setReservation(reservation)
    }).then(() => setLoading(false))
  }, [semesterApi, id, reservation?.id])

  return loading ? <ItemDetailsSkeleton/> : <div className="rounded-md p-6 bg-white shadow-md">
    <PageHeader title={`Edit course`}/>
    {
      reservation && <SaveReservation classrooms={classrooms} semesters={semesters} groups={groups} courses={courses}
                                      classes={classes} editMode={true} selected={reservation} setField={setField}/>
    }
    <div className="flex justify-end gap-3 mt-4">
      <Button onClick={() => router.push('/admin/reservations')} variant="soft"
              color="gray">Cancel</Button>
      <Button onClick={() => updateReservation()}> Edit</Button>
    </div>
  </div>
}
export default ReservationEditPage;