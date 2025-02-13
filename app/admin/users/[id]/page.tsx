"use client"; // Indique que c'est un composant client
import {use, useCallback, useEffect, useState} from 'react';
import {PostUserDto} from "@/app/openapi";
import useApis from "@/app/contexts/ApiContext";
import {SetField} from "@components/common/listingPage";
import PageHeader from "@components/common/PageHeader";
import {Button} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import ItemDetailsSkeleton from "@components/skeletons/itemPageSkeleton";
import SaveUser from "@/app/admin/users/SaveUser";


const UsersEditPage = ({params}: { params: Promise<{ id: number }> }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {id} = use(params);
  const [user, setUser] = useState<PostUserDto>();

  const {usersApi} = useApis()

  const setField = useCallback<SetField<PostUserDto>>((field, value) => {
    setUser(prev => prev ? ({...prev, [field]: value}) : undefined)
  }, [])

  const updateCourse = useCallback(() => {
    if (!user?.id) {
      return;
    }
    usersApi.modifyUser({
      id: user.id,
      postUserDto: {
        id: user?.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        birthDate: user.birthDate,
        password: user.password
      }
    }).then(() => router.push('/admin/users'))
  }, [usersApi, user, router])

  useEffect(() => {
    usersApi.getUserById({id: id}).then(user => {
      setUser(user as PostUserDto)
    }).then(() => setLoading(false))
  }, [usersApi, id, user?.id])

  return loading ? <ItemDetailsSkeleton/> : <div className="rounded-md p-6 bg-white shadow-md">
    <PageHeader title={`Edit course`}/>
    {
      user && <SaveUser editMode={true} selected={user as PostUserDto} setField={setField}/>
    }
    <div className="flex justify-end gap-3 mt-4">
      <Button onClick={() => router.push('/admin/users')} variant="soft"
              color="gray">Cancel</Button>
      <Button onClick={() => updateCourse()}> Edit</Button>
    </div>
  </div>
}
export default UsersEditPage;