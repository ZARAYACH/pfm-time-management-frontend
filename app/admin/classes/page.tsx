"use client"
import {useCallback, useEffect, useMemo, useState} from "react";
import useApis from "@/app/contexts/ApiContext";
import {AcademicClassDto, CourseDto, GroupDto, SemesterDto, UserDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveAcademicClass from "@/app/admin/classes/SaveAcademicClass";

const defaultAcademicClass: AcademicClassDto = {
  id: 0,
  courseId: 0,
  groupId: 0,
  semesterId: 0,
  teacherId: 0,
  courseName: "",
  groupName: "",
  teacherName: ""
};

const AcademicClassPage = () => {
  const {courseApi, groupApi, semesterApi, usersApi, academicClassApi} = useApis();

  const [users, setUsers] = useState<UserDto[]>([]);
  const [groups, setGroups] = useState<GroupDto[]>([]);
  const [semesters, setSemeters] = useState<SemesterDto[]>([]);
  const [courses, setCourses] = useState<CourseDto[]>([]);


  useEffect(() => {
    usersApi.listUsers().then(value => setUsers(value));
    groupApi.listGroup().then(value => setGroups(value));
    courseApi.listCourse().then(value => setCourses(value));
    semesterApi.listSemester().then(value => setSemeters(value));
  }, [courseApi, groupApi, semesterApi, usersApi]);

  const SaveComponent = useCallback((props: SaveComponentProps<AcademicClassDto>) => <SaveAcademicClass teachers={users}
                                                                                                        courses={courses}
                                                                                                        groups={groups}
                                                                                                        semesters={semesters}
                                                                                                        selected={defaultAcademicClass}
                                                                                                        editMode={true} {...props}/>, [users])

  const columns = useMemo<ColumnDef<AcademicClassDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'group',
    accessorKey: 'groupName',
    header: 'group',
  }, {
    id: 'Teacher',
    accessorKey: "teacherName",
    header: 'Teacher',
  }, {
    id: 'Semester',
    accessorKey: 'semesterId',
    header: 'Semester id ',
  }, {
    id: 'Course',
    accessorKey: "courseName",
    header: 'Course id ',
  }], []);

  return (
    <div className="p-6">
      <ListingPage<AcademicClassDto>
        columns={columns}
        sortBy={[{id: 'id', desc: true}]}
        listItems={() => academicClassApi.listAcademicClass()}
        resourceName="AcademicClasss"
        defaultPayload={defaultAcademicClass}
        SaveComponent={SaveComponent}
        createItem={payload => academicClassApi.createAcademicClass({academicClassDto: payload})}
        deleteItem={payload => academicClassApi.deleteAcademicClass({id: payload.id})}
      >
      </ListingPage>

    </div>
  );
};

export default AcademicClassPage;