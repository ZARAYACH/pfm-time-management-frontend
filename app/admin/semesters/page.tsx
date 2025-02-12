"use client"
import {useMemo} from "react";
import useApis from "@/app/contexts/ApiContext";
import {SemesterDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveSemester from "@/app/admin/semesters/SaveSemester";

const defaultSemester: SemesterDto = {id: 0, type: "FALL", year: new Date().getFullYear()};

const SaveComponent = (props: SaveComponentProps<SemesterDto>) => <SaveSemester editMode={true} {...props}/>

const ModulesPage = () => {
  const {semesterApi} = useApis();
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
      </ListingPage>

    </div>
  );
};

export default ModulesPage;