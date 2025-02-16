"use client"
import {useCallback, useEffect, useMemo, useState} from "react";
import useApis from "@/app/contexts/ApiContext";
import {AcademicClassDto, ClassRoomDto, CourseDto, GroupDto, SemesterDto, TimeTableDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";

import SaveTimeTable from "@/app/admin/timetables/SaveTimeTable";

const defaultTimeTable: TimeTableDto = {id: 0, groupId: 0, semesterId: 0, days: {}, groupName: ""};

const TimeTablePage = () => {
  const {courseApi, groupApi, classRoomApi, semesterApi, academicClassApi, timeTablesApi} = useApis();

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
  }, [academicClassApi, classRoomApi, courseApi, groupApi, semesterApi]);

  const SaveComponent = useCallback((props: SaveComponentProps<TimeTableDto>) => <SaveTimeTable classes={classes}
                                                                                                classRooms={classrooms}
                                                                                                semesters={semesters}
                                                                                                groups={groups}
                                                                                                courses={courses}
                                                                                                selected={defaultTimeTable}
                                                                                                editMode={true} {...props}/>, [classes, classrooms, courses, groups, semesters])

  const columns = useMemo<ColumnDef<TimeTableDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'semester',
    accessorFn: row => semesters.find(value => value.id === row.semesterId)?.year + " " + semesters.find(value => value.id === row.semesterId)?.type,
    header: 'semesterId',
  }, {
    id: 'group',
    accessorFn: row => groups.find(value => row.groupId == value.id)?.name,
    header: 'Group Name',
  }], [groups, semesters]);

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