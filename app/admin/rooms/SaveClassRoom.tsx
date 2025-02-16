import {Select, Text, TextField} from "@radix-ui/themes";
import {SaveComponentProps} from "@components/common/listingPage";
import {ClassRoomDto, DepartmentDto} from "@/app/openapi";

interface SaveDepartmentProps extends SaveComponentProps<ClassRoomDto> {
  departments: DepartmentDto[];
}


export default function SaveClassRoom({
                                        selected,
                                        setField,
                                        departments = []
                                      }: SaveDepartmentProps) {

  return <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">ClassRoom name</Text>
        <TextField.Root type={"text"} value={selected?.['name'] ?? ''}
                        onChange={event => setField('name', event.target.value)}
                        placeholder="name"/>
      </label>
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">ClassRoom number</Text>
        <TextField.Root type={"text"} value={selected?.['classNumber'] ?? ''}
                        onChange={event => setField('classNumber', event.target.value)}
                        placeholder="name"/>
      </label>
    </div>
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">ClassRoom capacity</Text>
        <TextField.Root type={"number"} value={selected?.['capacity'] ?? ''}
                        onChange={event => setField('capacity', Number(event.target.value))}
                        placeholder="capacity"/>
      </label>
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Department</Text>
        <Select.Root onValueChange={id => setField('departmentId', Number(id))}
                     value={String(selected?.['departmentId'])}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            {departments && departments.map((department, index) => <Select.Item key={index}
                                                                                value={String(department.id)}>{department.name}</Select.Item>)}
          </Select.Content>
        </Select.Root>
      </label>
    </div>
  </div>
}