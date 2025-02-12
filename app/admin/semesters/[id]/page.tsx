"use client"; // Indique que c'est un composant client
import {use, useCallback, useEffect, useState} from 'react';
import {SemesterDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {SetField} from "@components/common/listingPage";
import PageHeader from "@components/common/PageHeader";
import {Button} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import ItemDetailsSkeleton from "@components/skeletons/itemPageSkeleton";
import SaveSemester from "@/app/admin/semesters/SaveSemester";


const SemesterEditPage = ({params}: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {id} = use(params);
  const [semester, setSemester] = useState<SemesterDto>();

  const {semesterApi} = useApis()

  const setField = useCallback<SetField<SemesterDto>>((field, value) => {
    setSemester(prev => prev ? ({...prev, [field]: value}) : undefined)
  }, [])

  const updateCourse = useCallback(() => {
    if (!semester?.id) {
      return;
    }
    semesterApi.modifySemester({
      id: semester.id,
      semesterDto: {
        id: semester?.id,
        year: semester.year,
        endDate: semester.endDate,
        startDate: semester.startDate,
        type: semester.type,
      }
    }).then(() => router.push('/admin/semesters'))
  }, [semesterApi, semester, router])

  useEffect(() => {
    semesterApi.findSemesterById({id: id}).then(semester => {
      setSemester(semester)
    }).then(() => setLoading(false))
  }, [semesterApi, id, semester?.id])

  return loading ? <ItemDetailsSkeleton/> : <div className="rounded-md p-6 bg-white shadow-md">
    <PageHeader title={`Edit course`}/>
    {
      semester && <SaveSemester editMode={true} selected={semester} setField={setField}/>
    }
    <div className="flex justify-end gap-3 mt-4">
      <Button onClick={() => router.push('/admin/semesters')} variant="soft"
              color="gray">Cancel</Button>
      <Button onClick={() => updateCourse()}> Edit</Button>
    </div>
  </div>
}
export default SemesterEditPage;