import {Select, Text, TextField} from "@radix-ui/themes";
import {ClassRoomDtoTypeEnum, CourseDto} from "@/app/openapi";
import {SaveComponentProps} from "@components/common/listingPage";


export default function SaveCourse({selected, setField, editMode = false}: SaveComponentProps<CourseDto>) {
  return <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Module name</Text>
        <TextField.Root type={"text"} value={selected?.['name'] ?? ''}
                        onChange={event => setField('name', event.target.value)}
                        placeholder="name"/>
      </label>
    </div>
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Class room type</Text>
        <Select.Root disabled={!editMode}
                     onValueChange={type => setField('classRoomType', type as ClassRoomDtoTypeEnum)}
                     value={selected?.['classRoomType']}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            <Select.Item value="COURSE">Course</Select.Item>
            <Select.Item value="TP">TP</Select.Item>
            <Select.Item value="SEMINAR_ROOM">Seminar Room</Select.Item>
          </Select.Content>
        </Select.Root>
      </label>
    </div>
  </div>
}