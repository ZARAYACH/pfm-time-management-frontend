"use client"; // Indique que c'est un composant client
import {use, useCallback, useEffect, useState} from 'react';
import {AcademicClassDto, CourseDto, GroupDto, SemesterDto, TeacherDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {SetField} from "@components/common/listingPage";
import PageHeader from "@components/common/PageHeader";
import {Button} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import ItemDetailsSkeleton from "@components/skeletons/itemPageSkeleton";
import SaveAcademicClass from "@/app/admin/classes/SaveAcademicClass";


const AcademicClassEditPage = ({params}: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {id} = use(params);
  const [users, setUsers] = useState<TeacherDto[]>([]);
  const [groups, setGroups] = useState<GroupDto[]>([]);
  const [semesters, setSemeters] = useState<SemesterDto[]>([]);
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [academicClass, setAcademicClass] = useState<AcademicClassDto>();

  const {courseApi, groupApi, semesterApi, teachersApi, academicClassApi} = useApis();

  useEffect(() => {
    teachersApi.listTeachers().then(value => setUsers(value));
    groupApi.listGroup().then(value => setGroups(value));
    courseApi.listCourse().then(value => setCourses(value));
    semesterApi.listSemester().then(value => setSemeters(value));
  }, [courseApi, groupApi, semesterApi, setUsers, teachersApi]);

  const setField = useCallback<SetField<AcademicClassDto>>((field, value) => {
    setAcademicClass(prev => prev ? ({...prev, [field]: value}) : undefined)
  }, [])

  const updateCourse = useCallback(() => {
    if (!academicClass?.id) {
      return;
    }
    academicClassApi.modifyAcademicClass({
      id: academicClass.id,
      academicClassDto: academicClass
    }).then(() => router.push('/admin/classes'))
  }, [academicClass, academicClassApi, router])

  useEffect(() => {
    academicClassApi.findAcademicClassById({id: id}).then(department => {
      setAcademicClass(department)
    }).then(() => setLoading(false))
  }, [academicClassApi, id])

  return loading ? <ItemDetailsSkeleton/> : <div className="rounded-md p-6 bg-white shadow-md">
    <PageHeader title={`Edit Academic class`}/>
    {
      academicClass &&
        <SaveAcademicClass semesters={semesters} groups={groups} teachers={users} editMode={true}
                           selected={academicClass}
                           setField={setField} courses={courses}/>
    }
    <div className="flex justify-end gap-3 mt-4">
      <Button onClick={() => router.push('/admin/classes')} variant="soft"
              color="gray">Cancel</Button>
      <Button onClick={() => updateCourse()}> Edit</Button>
    </div>
  </div>
}
export default AcademicClassEditPage;