"use client"
import {useMemo} from "react";
import useApis from "@/app/contexts/ApiContext";
import {PostUserDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveUser from "@/app/admin/users/SaveUser";

const defaultUser: PostUserDto = {role: "STUDENT", email: '', password: ''};

const SaveComponent = (props: SaveComponentProps<PostUserDto>) => <SaveUser selected={defaultUser} editMode={true} {...props}/>

const UsersPage = () => {
  const {usersApi} = useApis();

  const columns = useMemo<ColumnDef<PostUserDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'email',
    accessorKey: 'email',
    header: 'Email',
  }, {
    id: 'role',
    accessorKey: 'role',
    header: 'Role',
  }, {
    id: 'firstName',
    accessorKey: 'firstName',
    header: 'First name',
  }, {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'Last name',
  }, {
    id: 'birthdate',
    accessorKey: 'birthdate',
    header: 'Birth date',
  }], []);

  return (
    <div className="p-6">
      <ListingPage<PostUserDto>
        columns={columns}
        sortBy={[{id: 'id', desc: true}]}
        listItems={() => usersApi.listUsers() as Promise<PostUserDto[]>}
        resourceName="User"
        defaultPayload={defaultUser}
        SaveComponent={SaveComponent}
        createItem={payload => usersApi.createUser({postUserDto: payload}) as Promise<PostUserDto>}
        deleteItem={payload => usersApi.deleteUser({id: payload.id})}
      >
      </ListingPage>

    </div>
  );
};

export default UsersPage;