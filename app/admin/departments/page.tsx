"use client"
import {useCallback, useEffect, useMemo, useState} from "react";
import useApis from "@/app/contexts/ApiContext";
import {DepartmentDto, UserDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveDepartment from "@/app/admin/departments/SaveDepartment";

const defaultDepartment: DepartmentDto = {id: 0, name: '', chiefId: 0};


const DepartmentPage = () => {
  const {departmentApi, usersApi} = useApis();

  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    usersApi.listUsers().then(value => setUsers(value));
  }, [usersApi]);

  const SaveComponent = useCallback((props: SaveComponentProps<DepartmentDto>) => <SaveDepartment users={users}
                                                                                                  selected={defaultDepartment}
                                                                                                  editMode={true} {...props}/>, [users])

  const columns = useMemo<ColumnDef<DepartmentDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'name',
    accessorKey: 'name',
    header: 'name',
  }, {
    id: 'Chief id',
    accessorKey: "chiefId",
    header: 'Chief Id',
  }], []);

  return (
    <div className="p-6">
      <ListingPage<DepartmentDto>
        columns={columns}
        sortBy={[{id: 'id', desc: true}]}
        listItems={() => departmentApi.listDepartment()}
        resourceName="Departments"
        defaultPayload={defaultDepartment}
        SaveComponent={SaveComponent}
        createItem={payload => departmentApi.createDepartment({departmentDto: payload})}
        deleteItem={payload => departmentApi.deleteDepartment({id: payload.id})}
      >
      </ListingPage>

    </div>
  );
};

export default DepartmentPage;