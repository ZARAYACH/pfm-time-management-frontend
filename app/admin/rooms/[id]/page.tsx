"use client"; // Indique que c'est un composant client
import {use, useCallback, useEffect, useState} from 'react';
import {ClassRoomDto, DepartmentDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {SetField} from "@components/common/listingPage";
import PageHeader from "@components/common/PageHeader";
import {Button} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import ItemDetailsSkeleton from "@components/skeletons/itemPageSkeleton";
import SaveClassRoom from "@/app/admin/rooms/SaveClassRoom";

const ClassRoomEditPage = ({params}: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {id} = use(params);
  const [classRoom, setClassRoom] = useState<ClassRoomDto>();

  const {classRoomApi, departmentApi} = useApis()

  const [departments, setDepartments] = useState<DepartmentDto[]>([]);

  useEffect(() => {
    departmentApi.listDepartment().then(value => setDepartments(value));
  }, [departmentApi]);

  const setField = useCallback<SetField<ClassRoomDto>>((field, value) => {
    setClassRoom(prev => prev ? ({...prev, [field]: value}) : undefined)
  }, [])

  const updateCourse = useCallback(() => {
    if (!classRoom?.id) {
      return;
    }
    classRoomApi.modifyClassRoom({
      id: classRoom.id,
      classRoomDto: {
        id: classRoom?.id,
        name: classRoom.name,
        capacity: classRoom.capacity,
        type: classRoom.type,
        number: classRoom.number,
        departmentId: classRoom.departmentId,
        amphie: classRoom.amphie
      }
    }).then(() => router.push('/admin/rooms'))
  }, [classRoom?.amphie, classRoom?.capacity, classRoom?.departmentId, classRoom?.id, classRoom?.name, classRoom?.number, classRoom?.type, classRoomApi, router])

  useEffect(() => {
    classRoomApi.findClassRoomById({id: id}).then(classroom => {
      setClassRoom(classroom)
    }).then(() => setLoading(false))
  }, [classRoomApi, departmentApi, id])

  return loading ? <ItemDetailsSkeleton/> : <div className="rounded-md p-6 bg-white shadow-md">
    <PageHeader title={`Edit department`}/>
    {
      classRoom && <SaveClassRoom departments={departments} editMode={true} selected={classRoom} setField={setField}/>
    }
    <div className="flex justify-end gap-3 mt-4">
      <Button onClick={() => router.push('/admin/rooms')} variant="soft"
              color="gray">Cancel</Button>
      <Button onClick={() => updateCourse()}> Edit</Button>
    </div>
  </div>
}
export default ClassRoomEditPage;