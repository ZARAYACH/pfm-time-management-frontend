import {Select, Text, TextField} from "@radix-ui/themes";
import {
  AcademicClassDto,
  ClassRoomDto,
  CourseDto,
  GroupDto,
  ReservationDto,
  ReservationDtoTypeEnum,
  SemesterDto
} from "@/app/openapi";
import {SaveComponentProps} from "@components/common/listingPage";


interface SaveAcademicClassProps extends SaveComponentProps<ReservationDto> {
  classes: AcademicClassDto[]
  groups: GroupDto[]
  semesters: SemesterDto[]
  courses: CourseDto[]
  classrooms: ClassRoomDto[]
}

export default function SaveReservation({
                                          selected,
                                          setField,
                                          classes = [],
                                          groups = [],
                                          semesters = [],
                                          courses = [],
                                          classrooms = []
                                        }: SaveAcademicClassProps) {

  return <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <label className="flex w-full flex-col">
        <Text as="div" size="2" mb="1" weight="bold">Reservation Type </Text>
        <Select.Root onValueChange={id => setField('type', id as ReservationDtoTypeEnum)}
                     value={selected?.['type']}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            <Select.Item value={ReservationDtoTypeEnum.None}>No repeat</Select.Item>
            <Select.Item value={ReservationDtoTypeEnum.Daily}>Daily</Select.Item>
            <Select.Item value={ReservationDtoTypeEnum.Weekly}>Weekly</Select.Item>
            <Select.Item value={ReservationDtoTypeEnum.Monthly}>Monthly</Select.Item>

          </Select.Content>
        </Select.Root>
      </label>
    </div>
    <div className={"flex w-full gap-3"}>
      <label className="flex w-full flex-col">
        <Text size="2" weight="bold">Academic class</Text>
        <Select.Root value={String(selected?.classId)} onValueChange={(id) => setField("classId", Number(id))}>
          <Select.Trigger/>
          <Select.Content>
            {classes ?
              classes.map((academicClass, index) => (
                <Select.Item key={index}
                             value={String(academicClass.id)}>{'Course ' + courses.find(value => value.id == academicClass.courseId)?.name +
                  ', group ' + groups.find(value => value.id == academicClass.groupId)?.name +
                  ", Semester " + semesters.find(value => value.id == academicClass.semesterId)?.year}</Select.Item>
              )) : <Select.Item value={"0"}>No class</Select.Item>}
          </Select.Content>
        </Select.Root>
      </label>
    </div>

    <div className="flex w-full gap-3">
      <label className="flex w-full flex-col">
        <Text size="2" weight="bold">Class room</Text>
        <Select.Root value={String(selected?.classroomId)}
                     onValueChange={(e) => setField("classroomId", Number(e))}>
          <Select.Trigger/>
          <Select.Content>
            {classrooms.map((room, index) => (
              <Select.Item key={index}
                           value={String(room.id)}>{classrooms.find(value => value.id == room.id)?.name +
                ', number ' + classrooms.find(value => value.id == room.id)?.classNumber}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </label>
    </div>

    <div className="flex gap-3">
      <label className="w-1/2">
        <Text size="2" weight="bold">Start time</Text>
        <TextField.Root
          type="datetime-local"
          value={selected?.['startTime'] ? new Date(selected['startTime']).toISOString().slice(0, 16) : ''}
          onChange={event => setField('startTime', new Date(event.target.value))}
          placeholder="Name"
        />

      </label>

      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">End Time</Text>
        <TextField.Root type={"datetime-local"}
                        value={selected?.['endTime'] ? new Date(selected['endTime']).toISOString().slice(0, 16) : ''}
                        onChange={event => setField('endTime', new Date(event.target.value))}
                        placeholder="Name"/>
      </label>
    </div>
    <div className="flex gap-3">
      <label className="w-1/2">
        <Text size="2" weight="bold">recurrence end time</Text>
        <TextField.Root disabled={selected?.type == "NONE"} type={"datetime-local"}
                        value={selected?.['recurrenceEndDate'] ? new Date(selected['recurrenceEndDate']).toISOString().slice(0, 16) : ''}
                        onChange={event => setField('recurrenceEndDate', new Date(event.target.value))}
                        placeholder="recurrence end time"/>
      </label>

      <label className="w-1/2">
        <Text as="div" size="2" mb="1" weight="bold">recurrence count</Text>
        <TextField.Root disabled={selected?.type == "NONE"} type={"number"} value={selected?.['recurrenceCount']}
                        onChange={event => setField('recurrenceCount', Number(event.target.value))}
                        placeholder="Count"/>
      </label>
    </div>
  </div>
}