"use client"; // Indique que c'est un composant client
import {use, useCallback, useEffect, useState} from 'react';
import {AcademicClassDto, ClassRoomDto, CourseDto, GroupDto, SemesterDto, TimeTableDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {SetField} from "@components/common/listingPage";
import PageHeader from "@components/common/PageHeader";
import {Button} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import ItemDetailsSkeleton from "@components/skeletons/itemPageSkeleton";
import SaveTimeTable from "@/app/admin/timetables/SaveTimeTable";


const TimeTableEditPage = ({params}: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {id} = use(params);
  const {courseApi, groupApi, classRoomApi, semesterApi, usersApi, academicClassApi, timeTablesApi} = useApis();
  const [timetable, setTimetable] = useState<TimeTableDto>();
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


  const setField = useCallback<SetField<TimeTableDto>>((field, value) => {
    setTimetable(prev => prev ? ({...prev, [field]: value}) : undefined)
  }, [setTimetable])

  const updateTimeTable = useCallback(() => {
    if (!timetable?.id) {
      return;
    }
    timeTablesApi.updateTimeTable({
      id: timetable.id,
      timeTableDto: {
        id: timetable?.id,
        groupId: timetable.groupId,
        semesterId: timetable.semesterId,
        days: timetable.days,
        groupName: ''
      }
    }).then(() => router.push('/admin/timetables'))
  }, [router, timeTablesApi, timetable?.days, timetable?.groupId, timetable?.id, timetable?.semesterId])

  useEffect(() => {
    timeTablesApi.findTimeTableById({id: id}).then(timetable => {
      setTimetable(timetable)
    }).then(() => setLoading(false))
  }, [academicClassApi, id, setTimetable, timeTablesApi])

  return loading ? <ItemDetailsSkeleton/> : <div className="rounded-md p-6 bg-white shadow-md">
    <PageHeader title={`Edit Timetable`}/>
    {
      timetable &&
        <SaveTimeTable selected={timetable} semesters={semesters} groups={groups} classes={classes}
                       classRooms={classrooms}
                       setField={setField} courses={courses}/>
    }
    <div className="flex justify-end gap-3 mt-4">
      <Button onClick={() => router.push('/admin/timetables')} variant="soft"
              color="gray">Cancel</Button>
      <Button onClick={() => updateTimeTable()}> Edit</Button>
    </div>
  </div>
}
export default TimeTableEditPage;