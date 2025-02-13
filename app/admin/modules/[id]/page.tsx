"use client"; // Indique que c'est un composant client
import {use, useCallback, useEffect, useState} from 'react';
import {CourseDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {SetField} from "@components/common/listingPage";
import PageHeader from "@components/common/PageHeader";
import {Button} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import ItemDetailsSkeleton from "@components/skeletons/itemPageSkeleton";
import SaveCourse from "@/app/admin/modules/SaveCourse";


const ModuleEditPage = ({params}: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {id} = use(params);
  const [course, setCourse] = useState<CourseDto>();

  const {courseApi} = useApis()

  const setField = useCallback<SetField<CourseDto>>((field, value) => {
    setCourse(prev => prev ? ({...prev, [field]: value}) : undefined)
  }, [])

  const updateCourse = useCallback(() => {
    if (!course?.id) {
      return;
    }
    courseApi.modifyCourse({
      id: course.id,
      courseDto: {
        id: course?.id,
        name: course.name,
        classRoomType: course.classRoomType,
      }
    }).then(() => router.push('/admin/modules'))
  }, [courseApi, course, router])

  useEffect(() => {
    courseApi.findCourseById({id: id}).then(course => {
      setCourse(course)
    }).then(() => setLoading(false))
  }, [courseApi, id, course?.id])

  return loading ? <ItemDetailsSkeleton/> : <div className="rounded-md p-6 bg-white shadow-md">
    <PageHeader title={`Edit course`}/>
    {
      course && <SaveCourse editMode={true} selected={course} setField={setField}/>
    }
    <div className="flex justify-end gap-3 mt-4">
      <Button onClick={() => router.push('/admin/modules')} variant="soft"
              color="gray">Cancel</Button>
      <Button onClick={() => updateCourse()}> Edit</Button>
    </div>
  </div>
}
export default ModuleEditPage;