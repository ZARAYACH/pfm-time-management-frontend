import {Select, Text, TextField} from "@radix-ui/themes";
import {DepartmentDto, UserDto} from "@/app/openapi";
import {SaveComponentProps} from "@components/common/listingPage";


interface SaveDepartmentProps extends SaveComponentProps<DepartmentDto> {
  users: UserDto[];
}

export default function SaveDepartment({
                                         selected,
                                         setField,
                                         editMode = false,
                                         users = []
                                       }: SaveDepartmentProps) {

  return <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Department name</Text>
        <TextField.Root type={"text"} value={selected?.['name'] ?? ''}
                        onChange={event => setField('name', event.target.value)}
                        placeholder="name"/>
      </label>
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Chief id</Text>
        <Select.Root disabled={!editMode}
                     onValueChange={id => setField('chiefId', Number(id))}
                     value={String(selected?.['chiefId'])}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            {users && users.map((user, index) => <Select.Item key={index}
                                                              value={String(user.id)}>{user.email}</Select.Item>)}
          </Select.Content>
        </Select.Root>
      </label>
    </div>
  </div>
}