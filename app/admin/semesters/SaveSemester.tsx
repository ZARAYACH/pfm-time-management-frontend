import {Select, Text, TextField} from "@radix-ui/themes";
import {SemesterDto, SemesterDtoTypeEnum} from "@/app/openapi";
import {SaveComponentProps} from "@components/common/listingPage";


export default function SaveSemester({
                                       selected ,
                                       setField,
                                       editMode = false
                                     }: SaveComponentProps<SemesterDto>) {
  return <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Semester year</Text>
        <TextField.Root type={"number"} value={selected?.['year'] ?? ''}
                        onChange={event => setField('year', Number(event.target.value))}
                        placeholder="Year"/>
      </label>
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Semester Type</Text>
        <Select.Root disabled={!editMode}
                     onValueChange={type => setField('type', type as SemesterDtoTypeEnum)}
                     value={selected?.['type']}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            <Select.Item value="FALL">Fall</Select.Item>
            <Select.Item value="SPRING">Spring</Select.Item>
          </Select.Content>
        </Select.Root>
      </label>
    </div>
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">Start date</Text>
        <TextField.Root type={"date"}
                        value={selected?.['startDate'] ? selected['startDate'].toISOString().split('T')[0] : ''}
                        onChange={event => setField('startDate', new Date(event.target.value))}
                        placeholder="Year"/>
      </label>
      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">End date</Text>
        <TextField.Root type={"date"}
                        value={selected?.['endDate'] ? selected['endDate'].toISOString().split('T')[0] : ''}
                        onChange={event => setField('endDate', new Date(event.target.value))}
                        placeholder="Year"/>
      </label>
    </div>
  </div>
}