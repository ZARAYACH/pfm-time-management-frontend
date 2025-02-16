"use client"
import {useMemo} from "react";
import useApis from "@/app/contexts/ApiContext";
import {SemesterDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveSemester from "@/app/admin/semesters/SaveSemester";
import {IconButton} from "@radix-ui/themes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faRefresh} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

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
            </div>
          )}
      </ListingPage>

    </div>
  );
};

export default ModulesPage;