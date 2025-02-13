import {Button, Card, Select, Text} from "@radix-ui/themes";
import {AcademicClassDto, ClassRoomDto, CourseDto, Day, GroupDto, SemesterDto, TimeTableDto} from "@/app/openapi";
import {SaveComponentProps} from "@components/common/listingPage";
import {useEffect, useState} from "react";


interface SaveAcademicClassProps extends SaveComponentProps<TimeTableDto> {
  classes: AcademicClassDto[];
  courses: CourseDto[];
  groups: GroupDto[];
  semesters: SemesterDto[];
  classRooms: ClassRoomDto[];
}

export const TIME_SLOTS = ["MORNING_FIRST", "MORNING_SECOND", "AFTERNOON_FIRST", "AFTERNOON_SECOND"];
export const DAYS = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

export default function SaveTimeTable({
                                        selected,
                                        classes = [],
                                        courses = [],
                                        groups = [],
                                        semesters = [],
                                        classRooms = [],
                                        setField
                                      }: SaveAcademicClassProps) {
  const [days, setDays] = useState<{ [key: string]: Day }>(selected?.days ?? {});
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0]);
  const [selectedAcademicClass, setSelectedAcademicClass] = useState<AcademicClassDto | null>();
  const [selectedClassRoom, setSelectedClassRoom] = useState<ClassRoomDto | null>();
  console.log(selected?.days)
  useEffect(() => {
    setField("days", days);
  }, [days, setField]);

  const handleAddTimeSlot = () => {
    if (!selectedAcademicClass) return;

    setDays((prev) => ({
      ...prev,
      [selectedDay]: {
        timeSlots: {
          ...(prev[selectedDay]?.timeSlots || {}),
          [selectedTimeSlot]: {
            classRoomId: Number(selectedClassRoom?.id),
            academicClassId: Number(selectedClassRoom?.id),
          },
        },
      },
    }));
    setSelectedAcademicClass(null);
    setSelectedClassRoom(null);
  };

  const handleRemoveTimeSlot = (day: string, slot: string) => {
    setDays((prev) => {
      const updatedSlots = {...prev[day]?.timeSlots};
      delete updatedSlots[slot];

      return {
        ...prev,
        [day]: {timeSlots: updatedSlots},
      };
    });
  };
  const handleAcademicClassChange = (id: string) => {
    setSelectedAcademicClass(classes.find(value => value.id == Number(id)));
  };
  const handleClassRoomChange = (id: string) => {
    setSelectedClassRoom(classRooms.find(value => value.id == Number(id)));
  };

  return <div className="flex flex-col gap-3">
    <div className="flex gap-3">
      <label className="w-full">
        <label className="flex my-3 flex-col">
          <Text size="2" weight="bold">Semesters</Text>
          <Select.Root value={String(selected?.semesterId)}
                       onValueChange={(value) => setField("semesterId", Number(value))}>
            <Select.Trigger/>
            <Select.Content>
              {semesters.map((semester, i) => (
                <Select.Item key={i} value={String(semester.id)}>{semester.year + ' ' + semester.type}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </label>
        <label className="flex flex-col">
          <Text size="2" weight="bold">Group</Text>
          <Select.Root value={String(selected?.groupId)}
                       onValueChange={(value) => setField("groupId", Number(value))}>
            <Select.Trigger/>
            <Select.Content>
              {groups.map((value, i) => (
                <Select.Item key={i} value={String(value.id)}>{value.name}</Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </label>
        <Text as="div" size="2" className={"my-3"} mb="1" weight="bold">Time table</Text>
        <div className="flex gap-3 items-end border p-4 rounded-lg shadow-md">
          <label className="flex flex-col">
            <Text size="2" weight="bold">Day</Text>
            <Select.Root value={selectedDay} onValueChange={setSelectedDay}>
              <Select.Trigger/>
              <Select.Content>
                {DAYS.map((day) => (
                  <Select.Item key={day} value={day}>{day}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>

          <label className="flex flex-col">
            <Text size="2" weight="bold">Time Slot</Text>
            <Select.Root value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
              <Select.Trigger/>
              <Select.Content>
                {TIME_SLOTS.map((slot) => (
                  <Select.Item key={slot} value={slot}>{slot}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>

          <label className="flex flex-col">
            <Text size="2" weight="bold">Academic class</Text>
            <Select.Root value={String(selectedAcademicClass?.id)} onValueChange={handleAcademicClassChange}>
              <Select.Trigger/>
              <Select.Content>
                {classes.filter(value => value.semesterId == selected?.semesterId && value.groupId == selected.groupId).length > 0 ?
                  classes.filter(value => value.semesterId == selected?.semesterId && value.groupId == selected.groupId).map((academicClass, index) => (
                    <Select.Item key={index}
                                 value={String(academicClass.id)}>{'Course ' + courses.find(value => value.id == academicClass.courseId)?.name +
                      ', group ' + groups.find(value => value.id == academicClass.groupId)?.name +
                      ", Semester " + semesters.find(value => value.id == academicClass.semesterId)?.year}</Select.Item>
                  )) : <Select.Item value={"0"}>No class</Select.Item>}
              </Select.Content>
            </Select.Root>
          </label>

          <label className="flex flex-col">
            <Text size="2" weight="bold">Class room</Text>
            <Select.Root value={String(selectedClassRoom?.id)} onValueChange={handleClassRoomChange}>
              <Select.Trigger/>
              <Select.Content>
                {classRooms.map((room, index) => (
                  <Select.Item key={index}
                               value={String(room.id)}>{classRooms.find(value => value.id == room.id)?.name +
                    ', number ' + classRooms.find(value => value.id == room.id)?.classNumber}</Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>
          <Button onClick={handleAddTimeSlot}>Add</Button>
        </div>

        {Object.entries(days).map(([day, details]) => (
          <Card key={day} className="p-4 my-2">
            <Text as="div" size="3" weight="bold">{day}</Text>

            {Object.entries(details.timeSlots || {}).length > 0 ? (
              <div className="mt-2">
                {Object.entries(details.timeSlots ?? []).map(([slot, info]) => (
                  <div key={slot} className="flex justify-between border-b py-2 items-center">
                    <Text as="div" size="2">{slot}</Text>
                    <Text as="div"
                          size="2">Classroom:{String(info.classRoomId)} {classRooms.find(value => value.id == info.classRoomId)?.name +
                      ', number ' + classRooms.find(value => value.id == info.classRoomId)?.classNumber} </Text>
                    <Text as="div"
                          size="2">Class #{info.academicClassId}: {'Course ' +
                      courses.find(value => value.id == classes.find(value1 => value1.id == info.classRoomId)?.courseId)?.name +
                      ', group ' + groups.find(value => value.id == classes.find(value1 => value1.id == info.classRoomId)?.groupId)?.name +
                      ", Semester " + semesters.find(value => value.id == classes.find(value1 => value1.id == info.classRoomId)?.semesterId)?.year}</Text>
                    <Button variant="soft" color="red" onClick={() => handleRemoveTimeSlot(day, slot)}>Remove</Button>
                  </div>
                ))}
              </div>
            ) : (
              <Text as="div" size="2" className="text-gray-500">No time slots</Text>
            )}
          </Card>
        ))}
      </label>
    </div>
  </div>
    ;
}