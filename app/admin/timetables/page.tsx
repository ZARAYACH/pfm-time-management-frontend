"use client"
import {useCallback, useEffect, useMemo, useState} from "react";
import useApis from "@/app/contexts/ApiContext";
import {AcademicClassDto, ClassRoomDto, CourseDto, GroupDto, SemesterDto, TimeTableDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveTimeTable from "@/app/admin/timetables/SaveTimeTable";

const defaultTimeTable: TimeTableDto = {id: 0, groupId: 0, semesterId: 0, days: {}};

const TimeTablePage = () => {
  const {courseApi, groupApi, classRoomApi, semesterApi, academicClassApi, timeTablesApi} = useApis();

  const [classes, setClasses] = useState<AcademicClassDto[]>([]);
  const [semesters, setSemesters] = useState<SemesterDto[]>([]);
  const [courses, setCourse] = useState<CourseDto[]>([]);
  const [groups, setGroups] = useState<GroupDto[]>([]);
  const [classrooms, setClassrooms] = useState<ClassRoomDto[]>([]);

  const fetchData = useCallback(async () => {
    const [groupsData, semestersData, coursesData, classesData, classroomsData] = await Promise.all([
      groupApi.listGroup(),
      semesterApi.listSemester(),
      courseApi.listCourse(),
      academicClassApi.listAcademicClass(),
      classRoomApi.listClassRoom()
    ]);

    setGroups(groupsData);
    setSemesters(semestersData);
    setCourse(coursesData);
    setClasses(classesData);
    setClassrooms(classroomsData);
  }, [academicClassApi, classRoomApi, courseApi, groupApi, semesterApi]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const SaveComponent = useCallback((props: SaveComponentProps<TimeTableDto>) => <SaveTimeTable classes={classes}
                                                                                                classRooms={classrooms}
                                                                                                semesters={semesters}
                                                                                                groups={groups}
                                                                                                courses={courses}
                                                                                                selected={defaultTimeTable}
                                                                                                editMode={true} {...props}/>, [classes, courses, groups, semesters])

  const columns = useMemo<ColumnDef<TimeTableDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'Semester',
    accessorKey: 'semesterId',
    header: 'semesterId',
  }, {
    id: 'group',
    accessorKey: "groupId",
    header: 'Group ID ',
  }], []);

  return (
    <div className="p-6">
      <ListingPage<TimeTableDto>
        columns={columns}
        sortBy={[{id: 'id', desc: true}]}
        listItems={() => timeTablesApi.listTimeTables()}
        resourceName="TimeTables"
        defaultPayload={defaultTimeTable}
        SaveComponent={SaveComponent}
        createItem={payload => timeTablesApi.createTimeTable({timeTableDto: payload})}
        deleteItem={payload => timeTablesApi.deleteTimeTable({id: payload.id})}
      >
        {/*TODO: add reservation of timetable */}
        {/*{*/}
        {/*  (item,) => (*/}
        {/*    <div className="flex justify-between items-center">*/}
        {/*      <div className="flex gap-2">*/}
        {/*        <IconButton onClick={() => reserveTimeTable(item)} variant="soft" className="mr-2">*/}
        {/*          <FontAwesomeIcon icon={faCalendar}/>*/}
        {/*        </IconButton>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  )}*/}
      </ListingPage>

    </div>
  );
};

export default TimeTablePage;