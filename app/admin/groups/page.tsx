"use client"
import {useCallback, useEffect, useMemo, useState} from "react";
import useApis from "@/app/contexts/ApiContext";
import {GroupDto, UserDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveGroup from "@/app/admin/groups/SaveGroup";

const defaultGroup: GroupDto = {id: 0};

const GroupsPage = () => {
  const {groupApi, usersApi} = useApis();

  const [users, setUsers] = useState<UserDto[]>([]);

  useEffect(() => {
    usersApi.listUsers().then(value => setUsers(value));
  }, [usersApi]);

  const SaveComponent = useCallback((props: SaveComponentProps<GroupDto>) => <SaveGroup users={users}
                                                                                        selected={defaultGroup}
                                                                                        editMode={true} {...props}/>, [users])

  const columns = useMemo<ColumnDef<GroupDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
  }], []);

  return (
    <div className="p-6">
      <ListingPage<GroupDto>
        columns={columns}
        sortBy={[{id: 'id', desc: true}]}
        listItems={() => groupApi.listGroup() as Promise<GroupDto[]>}
        resourceName="Groups"
        defaultPayload={defaultGroup}
        SaveComponent={SaveComponent}
        createItem={payload => groupApi.createGroup({groupDto: payload})}
        deleteItem={payload => groupApi.deleteGroup({id: payload.id})}
      >
      </ListingPage>

    </div>
  );
};

export default GroupsPage;