"use client";
import useApis from "@/app/contexts/ApiContext";
import {useEffect, useRef, useState} from "react";
import {AcademicClassDto, SemesterDto, TimeTableDto} from "@/app/openapi";
import {Button, Select, Text, TextField} from "@radix-ui/themes";
import Timetable from "@components/common/TimeTable";
import {useAuth} from "@/app/contexts/AuthContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const StudentDashboard = () => {
  const {timeTablesApi, semesterApi, academicClassApi} = useApis();
  const [timetables, setTimetables] = useState<TimeTableDto[]>([]);
  const [semesters, setSemesters] = useState<SemesterDto[]>([]);
  const [selectedSemester, setSelectedSemester] = useState<SemesterDto>({id: 0, year: 0} as SemesterDto);
  const [academicClasses, setAcademicClasses] = useState<AcademicClassDto[]>([]);

  const {user} = useAuth();

  const calendarRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    timeTablesApi.getStudentTimetables().then(value => setTimetables(value));
    semesterApi.listSemester().then(value => setSemesters(value));
    academicClassApi.listAcademicClass().then(value => setAcademicClasses(value));
  }, [academicClassApi, semesterApi, timeTablesApi]);

  const handleExportPDF = async () => {
    if (!calendarRef.current) return;

    setIsLoading(true);

    try {
      const canvas = await html2canvas(calendarRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
      });

      const pdf = new jsPDF('landscape', 'mm', 'a4');
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage({
        imageData: canvas.toDataURL('image/png', 1.0),
        format: 'PNG',
        x: 10,
        y: 30,
        width: imgWidth,
        height: imgHeight,
      });

      pdf.setFontSize(18);
      pdf.text(`Emploi du temps de group ${user?.groupName} - ${user?.firstName} ${user?.lastName} `, 140, 20, {align: 'center'});
      pdf.setFontSize(12);
      pdf.text(`Généré le ${new Date().toLocaleDateString()}`, 140, 30, {align: 'center'});

      pdf.save(`emploi-du-temps-${user?.firstName} ${user?.lastName}.pdf`);
    } catch (error) {
      console.error('Erreur génération PDF:', error);
      alert("Erreur lors de l'export !");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-6">
      <Text as="div" size="2" mb="1" weight="bold">Semester</Text>
      <Select.Root onValueChange={id => {
        const semester = semesters.find(semester => semester.id === Number(id));
        if (semester) {
          setSelectedSemester(semester)
        }
      }} value={selectedSemester ? String(selectedSemester?.id) : String(semesters?.[0]?.id)}>
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

      <Button
        onClick={handleExportPDF}
        disabled={isLoading}
        loading={isLoading}
        className={`bg-blue-500 text-white px-4 py-2 rounded my-3 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Génération en cours...' : 'Exporter en PDF'}
      </Button>
      <h1 className="text-2xl font-bold mb-6">Mon Emploi du Temps</h1>
      <div ref={calendarRef} className="bg-white p-4 rounded-lg shadow-md my-3 ">
        Semester starts at :{selectedSemester.startDate?.toLocaleDateString()}<br/>
        Semester ends at : {selectedSemester.endDate?.toLocaleDateString()}
        <Timetable academicClasses={academicClasses}
                   timetable={selectedSemester ? timetables.find(value => value.semesterId == selectedSemester?.id) : timetables.find(value => value.semesterId == semesters?.[0].id)}/>
      </div>
    </div>
  );
};

export default StudentDashboard;