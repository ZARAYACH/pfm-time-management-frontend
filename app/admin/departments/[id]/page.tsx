"use client"; // Indique que c'est un composant client
import {use, useCallback, useEffect, useState} from 'react';
import {DepartmentDto, UserDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {SetField} from "@components/common/listingPage";
import PageHeader from "@components/common/PageHeader";
import {Button} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import ItemDetailsSkeleton from "@components/skeletons/itemPageSkeleton";
import SaveDepartment from "@/app/admin/departments/SaveDepartment";


const DepartmentEditPage = ({params}: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {id} = use(params);
  const [department, setDepartment] = useState<DepartmentDto>();

  const {teachersApi, departmentApi} = useApis()

  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    teachersApi.listTeachers().then(value => setUsers(value));
  }, [teachersApi]);

  const setField = useCallback<SetField<DepartmentDto>>((field, value) => {
    setDepartment(prev => prev ? ({...prev, [field]: value}) : undefined)
  }, [])

  const updateCourse = useCallback(() => {
    if (!department?.id) {
      return;
    }
    departmentApi.modifyDepartment({
      id: department.id,
      departmentDto: {
        id: department?.id,
        name: department.name,
        chiefId: department.chiefId,
      }
    }).then(() => router.push('/admin/departments'))
  }, [departmentApi, department, router])

  useEffect(() => {
    departmentApi.findDepartmentById({id: id}).then(department => {
      setDepartment(department)
    }).then(() => setLoading(false))
  }, [departmentApi, id, department?.id])

  return loading ? <ItemDetailsSkeleton/> : <div className="rounded-md p-6 bg-white shadow-md">
    <PageHeader title={`Edit department`}/>
    {
      department && <SaveDepartment users={users} editMode={true} selected={department} setField={setField}/>
    }
    <div className="flex justify-end gap-3 mt-4">
      <Button onClick={() => router.push('/admin/departments')} variant="soft"
              color="gray">Cancel</Button>
      <Button onClick={() => updateCourse()}> Edit</Button>
    </div>
  </div>
}
export default DepartmentEditPage;