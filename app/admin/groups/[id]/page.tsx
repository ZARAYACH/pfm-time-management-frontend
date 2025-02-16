"use client"; // Indique que c'est un composant client
import {use, useCallback, useEffect, useState} from 'react';
import {GroupDto, UserDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {SetField} from "@components/common/listingPage";
import PageHeader from "@components/common/PageHeader";
import {Button} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import ItemDetailsSkeleton from "@components/skeletons/itemPageSkeleton";
import SaveGroup from "@/app/admin/groups/SaveGroup";


const GroupsEditPage = ({params}: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {id} = use(params);
  const [group, setGroup] = useState<GroupDto>();
  const [users, setUsers] = useState<UserDto[]>([]);
  const {usersApi, groupApi} = useApis()

  const setField = useCallback<SetField<GroupDto>>((field, value) => {
    setGroup(prev => prev ? ({...prev, [field]: value}) : undefined)
  }, [])

  const updateCourse = useCallback(() => {
    if (!group?.id) {
      return;
    }
    groupApi.modifyGroup({
      id: group.id,
      groupDto: {
        id: group?.id,
        name: group.name,
        studentIds: group.studentIds,
      }
    }).then(() => router.push('/admin/groups'))
  }, [groupApi, group, router])

  useEffect(() => {
    groupApi.findGroupById({id: id}).then(group => {
      setGroup(group as GroupDto)
    }).then(() => setLoading(false))
    usersApi.listUsers()
      .then(value => setUsers(value))
      .then(() => setLoading(false))
  }, [groupApi, id, usersApi])

  return loading ? <ItemDetailsSkeleton/> : <div className="rounded-md p-6 bg-white shadow-md">
    <PageHeader title={`Edit course`}/>
    {
      group && <SaveGroup editMode={true} selected={group} setField={setField} users={users}/>
    }
    <div className="flex justify-end gap-3 mt-4">
      <Button onClick={() => router.push('/admin/groups')} variant="soft"
              color="gray">Cancel</Button>
      <Button onClick={() => updateCourse()}> Edit</Button>
    </div>
  </div>
}
export default GroupsEditPage;