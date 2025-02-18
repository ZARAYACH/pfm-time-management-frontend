"use client";
import {useEffect, useState} from 'react';
import useApis from "@/app/contexts/ApiContext";
import {AcademicClassDto, SemesterDto, TimeTableDto} from "@/app/openapi";
import {Select, Text} from "@radix-ui/themes";
import Timetable from "@components/common/TimeTable";

const TeacherTimetable = () => {
  const {timeTablesApi, semesterApi, academicClassApi} = useApis();
  const [timetables, setTimetables] = useState<TimeTableDto[]>([]);
  const [semesters, setSemesters] = useState<SemesterDto[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<SemesterDto>();
  const [academicClasses, setAcademicClasses] = useState<AcademicClassDto[]>([]);

  useEffect(() => {
    timeTablesApi.getTeacherTimetable().then(value => setTimetables(value));
    academicClassApi.listAcademicClass().then(value => setAcademicClasses(value));
    semesterApi.listSemester().then(value => setSemesters(value));
  }, [academicClassApi, semesterApi, timeTablesApi]);
  console.log(academicClasses)
  return (
    <div className="p-6">
      <Text as="div" size="2" mb="1" weight="bold">Semester</Text>
      <Select.Root onValueChange={id => setSelectedSemester(semesters.find(semester => semester.id === Number(id)))}
                   value={selectedSemester ? String(selectedSemester?.id) : String(semesters?.[0]?.id)}>
        <Select.Trigger/>
        <Select.Content align="start" position="popper">
          {semesters ? semesters.map((semester, index) => <Select.Item key={index}
                                                                       value={String(semester.id)}>{semester.year + ' ' + semester.type}</Select.Item>) :
            <Select.Item value={""}>No Data</Select.Item>
          }
        </Select.Content>
      </Select.Root>

      <h1 className="text-2xl font-bold mb-6">Mon Emploi du Temps</h1>
      {timetables && <Timetable academicClasses={academicClasses}
                                timetable={selectedSemester ?
                                  timetables.find(value => value.semesterId == selectedSemester?.id) :
                                  timetables.find(value => value.semesterId == semesters?.[0].id)}/>}
    </div>
  );
};

export default TeacherTimetable;