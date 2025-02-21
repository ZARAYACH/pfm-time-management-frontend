"use client"
import React, {useMemo} from "react";
import useApis from "@/app/contexts/ApiContext";
import {SemesterDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveSemester from "@/app/admin/semesters/SaveSemester";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";
import {IconButton} from "@radix-ui/themes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faRefresh} from "@fortawesome/free-solid-svg-icons";

const defaultSemester: SemesterDto = {id: 0, type: "FALL", year: new Date().getFullYear()};

const SaveComponent = (props: SaveComponentProps<SemesterDto>) => <SaveSemester editMode={true} {...props}/>

const ModulesPage = () => {
  const {semesterApi} = useApis();
  const router = useRouter();
  const columns = useMemo<ColumnDef<SemesterDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'year',
    accessorKey: 'year',
    header: 'Year',
  }, {
    id: 'type',
    accessorKey: 'type',
    header: 'Type',
  }, {
    id: 'startDate',
    accessorFn: row => row.startDate?.toLocaleDateString("en-US"),
    header: 'Start Date',
  }, {
    id: 'endDate',
    accessorFn: row => row.endDate?.toLocaleDateString("en-US"),
    header: 'End date',
  }], []);

  function generateTimeTable(item: SemesterDto) {
    semesterApi.generateSemesterTimeTables({id: item.id})
      .then(() => toast.success("Semester timetable were generated successfully"))
      .then(() => router.push("/admin/timetables"))
  }

  function reserveSemester(item: SemesterDto) {
    semesterApi.reserveClassroomsForSemester({id: item.id})
      .then(() => toast.success("semester was reserved"))
      .then(() => router.push("/admin/reservations"))
  }

  //
  // const downloadTimetables = useCallback(async (item: SemesterDto) => {
  //   await timeTablesApi.listTimeTables({semesterId: item.id})
  //     .then(timetables =>  generateHTMLTimetables(timetables))
  // }, [generateHTMLTimetables, timeTablesApi]);
  //
  // const generateHTMLTimetables = useCallback((timetables: TimeTableDto[]) => {
  //   if (!timetables) return "<p>No timetable available</p>";
  //   const html = `
  //       <html lang="en">
  //       <head>
  //           <title>Des Emploi de temps </title>
  //       </head>
  //       <body>
  //       ${timetables.map(timetable => {
  //     return `<br/><br/><h2>Emploi du temps - ${timetable.groupName}</h2>
  //     <p>Generated on: ${new Date().toLocaleDateString()}</p>
  //     ${Timetable({timetable, academicClasses})}`
  //   })}
  //       </body>
  //       </html>
  //   `;
  //   downloadPDF(html);
  // }, [academicClasses]);
  //
  // const downloadPDF = (html: string) => {
  //   try {
  //     const pdf = new jsPDF("portrait", "mm", "a4");
  //     pdf.setFontSize(18);
  //     pdf.text(`des Emplois du temps} `, 105, 20, {align: "center"});
  //     pdf.setFontSize(12);
  //     pdf.text(`Généré le ${new Date().toLocaleDateString()}`, 105, 30, {align: "center"});
  //
  //     const timetableHTML = html;
  //     pdf.html(timetableHTML, {
  //       callback: function (doc) {
  //         doc.save(`des emploi du temps.pdf`);
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Erreur génération PDF:", error);
  //     alert("Erreur lors de l'export !");
  //   }
  // };

  return (
    <div className="p-6">
      <ListingPage<SemesterDto>
        columns={columns}
        sortBy={[{id: 'id', desc: true}]}
        listItems={() => semesterApi.listSemester()}
        resourceName="Semester"
        defaultPayload={defaultSemester}
        SaveComponent={SaveComponent}
        createItem={payload => semesterApi.createSemester({semesterDto: payload})}
        deleteItem={payload => semesterApi.deleteSemester({id: payload.id})}
      >
        {
          (item,) => (
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <IconButton onClick={() => generateTimeTable(item)} variant="soft" className="mr-2">
                  <FontAwesomeIcon icon={faCalendar}/>
                </IconButton>
              </div>
              <div className="flex gap-2">
                <IconButton onClick={() => reserveSemester(item)} variant="soft" className="mr-2">
                  <FontAwesomeIcon icon={faRefresh}/>
                </IconButton>
              </div>
              {/*<div className="flex gap-2">*/}
              {/*  <IconButton onClick={() => (item)} variant="soft" className="mr-2">*/}
              {/*    <FontAwesomeIcon icon={faRefresh}/>*/}
              {/*  </IconButton>*/}
              {/*</div>*/}
            </div>
          )}
      </ListingPage>

    </div>
  );
};

export default ModulesPage;