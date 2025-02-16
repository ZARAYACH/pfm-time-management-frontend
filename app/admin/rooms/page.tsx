"use client"
import {useCallback, useEffect, useMemo, useState} from "react";
import useApis from "@/app/contexts/ApiContext";
import {ClassRoomDto, DepartmentDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveClassRoom from "@/app/admin/rooms/SaveClassRoom";


const defaultRoom: ClassRoomDto = {id: 0, capacity: 0, classNumber: "", type: "COURSE"}

const ClassRoomsPage = () => {
  const {departmentApi, classRoomApi} = useApis();

  const [departments, setDepartments] = useState<DepartmentDto[]>([]);

  useEffect(() => {
    departmentApi.listDepartment().then(value => setDepartments(value));
  }, [departmentApi])

  const SaveComponent = useCallback((props: SaveComponentProps<ClassRoomDto>) => <SaveClassRoom
    departments={departments} editMode={true} {...props}/>, [departments])

  const columns = useMemo<ColumnDef<ClassRoomDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'Name',
    accessorKey: "name",
    header: 'Name',
  }, {
    id: 'Number',
    accessorKey: 'classNumber',
    header: 'number',
  }, {
    id: 'capacity',
    accessorKey: 'capacity',
    header: 'capacity',
  }, {
    id: 'departmentId',
    accessorKey: 'departmentId',
    header: 'departementId',
  }, {
    id: 'type',
    accessorKey: 'type',
    header: 'type',
  }], []);

  return (
    <div className="p-6">
      <ListingPage<ClassRoomDto>
        columns={columns}
        sortBy={[{id: 'id', desc: true}]}
        listItems={() => classRoomApi.listClassRoom()}
        resourceName="Class rooms"
        defaultPayload={defaultRoom}
        SaveComponent={SaveComponent}
        createItem={payload => classRoomApi.createClassRoom({classRoomDto: payload})}
        deleteItem={payload => classRoomApi.deleteClassRoom({id: payload.id})}
      >
      </ListingPage>

    </div>
  );
};

export default ClassRoomsPage;