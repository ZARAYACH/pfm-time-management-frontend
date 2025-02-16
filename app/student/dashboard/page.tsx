"use client";
import useApis from "@/app/contexts/ApiContext";
import {useEffect, useState} from "react";
import {SemesterDto, TimeTableDto} from "@/app/openapi";
import {Select, Text, TextField} from "@radix-ui/themes";
import Timetable from "@components/common/TimeTable";

const StudentDashboard = () => {
  const {timeTablesApi, semesterApi} = useApis();
  const [timetables, setTimetables] = useState<TimeTableDto[]>([]);
  const [semesters, setSemesters] = useState<SemesterDto[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<SemesterDto>({id: 0, year: 0} as SemesterDto);

  useEffect(() => {
    timeTablesApi.getStudentTimetables().then(value => setTimetables(value));
    semesterApi.listSemester().then(value => setSemesters(value));
  }, [semesterApi, timeTablesApi]);

  return (
    <div className="p-6">
      <Text as="div" size="2" mb="1" weight="bold">Semester</Text>
      <Select.Root onValueChange={id => {
        const semester = semesters.find(semester => semester.id === Number(id));
        if (semester) {
          setSelectedSemester(semester)
        }
      }}
                   value={selectedSemester ? String(selectedSemester?.id) : String(semesters?.[0]?.id)}>
        <Select.Trigger/>
        <Select.Content align="start" position="popper">
          {semesters ? semesters.map((semester, index) => <Select.Item key={index}
                                                                       value={String(semester.id)}>{semester.year + ' ' + semester.type}</Select.Item>) :
            <Select.Item value={""}>No Data</Select.Item>
          }
        </Select.Content>
      </Select.Root>
      <Text as="div" size="2" mb="1" weight="bold">Group name</Text>
      <TextField.Root
        disabled={true}
        value={timetables.find(value => value.semesterId == selectedSemester?.id)?.groupName ?? ""}
      >
      </TextField.Root>
      <h1 className="text-2xl font-bold mb-6">Mon Emploi du Temps</h1>
      <Timetable
        timetable={selectedSemester ? timetables.find(value => value.semesterId == selectedSemester?.id) : timetables.find(value => value.semesterId == semesters?.[0].id)}/>
    </div>
  );
};

export default StudentDashboard;