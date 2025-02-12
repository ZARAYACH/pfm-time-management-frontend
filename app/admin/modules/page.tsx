"use client"
import {useMemo} from "react";
import useApis from "@/app/contexts/ApiContext";
import {CourseDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage, {SaveComponentProps} from "@components/common/listingPage";
import SaveCourse from "@/app/admin/modules/SaveCourse";

const SaveComponent = (props: SaveComponentProps<CourseDto>) => <SaveCourse editMode={true} {...props}/>

const defaultCourse: CourseDto = {id: 0, classRoomType: "COURSE", name: ''}

const SemestersPage = () => {
  const {courseApi} = useApis();

  const columns = useMemo<ColumnDef<CourseDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'Name',
    accessorFn: row => row.name ,
    header: 'Name',
  }, {
    id: 'ClassRoom type',
    accessorFn: row => row.classRoomType,
    header: 'classRoom type',
  }], []);

  return (
    <div className="p-6">
      <ListingPage<CourseDto>
        columns={columns}
        sortBy={[{id: 'id', desc: true}]}
        listItems={() => courseApi.listCourse()}
        resourceName="Module"
        defaultPayload={defaultCourse}
        SaveComponent={SaveComponent}
        createItem={payload => courseApi.createCourse({courseDto: payload})}
        deleteItem={payload => courseApi.deleteCourse({id: payload.id})}
      >
      </ListingPage>

    </div>
  );
};

export default SemestersPage;