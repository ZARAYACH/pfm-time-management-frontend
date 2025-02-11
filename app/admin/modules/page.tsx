"use client"
//import { useEffect, useState } from 'react';
import {useMemo} from "react";
import useApis from "@/app/contexts/ApiContext";
import {CourseDto} from "@/app/openapi";
import {ColumnDef} from "@tanstack/table-core";
import ListingPage from "@components/common/listingPage";
//import Loader from '../../../components/common/Loader';

const ModulesPage = () => {
  // const [loading, setLoading] = useState<boolean>(true);
  const {courseApi} = useApis();

  const columns = useMemo<ColumnDef<CourseDto>[]>(() => [{
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
  }, {
    id: 'Name',
    accessorFn: row => row.name + ' ' + row.name,
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
        resourceName="Modules"
      ></ListingPage>

    </div>
);
};

export default ModulesPage;