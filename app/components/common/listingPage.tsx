"use client"
import {Button, Dialog, TextField} from "@radix-ui/themes";
import PageHeader from "@/app/components/common/PageHeader";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ReactElement, useCallback, useEffect, useMemo, useState} from "react";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {SortingState, useReactTable} from "@tanstack/react-table";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from "@tanstack/table-core";
import DataTable, {Update} from "@components/common/DataTable";
import {toast} from "react-toastify";

export type SetField<T> = <K extends keyof T>(field: K, value: T[K]) => void;

export type SaveComponentProps<T> = { selected?: T, setField: SetField<T>, editMode?: boolean }

type ListingPageProps<T extends { id?: number | string }> = {
  columns: ColumnDef<T, T>[],
  defaultPayload?: T,
  listItems: () => Promise<T[]>,
  createItem?: (item: T) => Promise<T>,
  deleteItem?: (p: { id: number}) => Promise<{[p: string]: boolean}>,
  resourceName?: string,
  pageMaxSize?: number,
  SaveComponent?: (props: SaveComponentProps<T>) => ReactElement,
  children?: (item: T, update?: Update<T>) => ReactElement,
  sortBy?: SortingState
}

export default function ListingPage<T extends { id?: number }>
({
   columns,
   defaultPayload,
   listItems,
   createItem,
   deleteItem,
   resourceName,
   pageMaxSize,
   sortBy,
   SaveComponent,
   children
 }: ListingPageProps<T>) {

  const [data, setData] = useState<T[]>([]);
  const [selected, setSelected] = useState<T | undefined>(defaultPayload);
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    listItems().then(data => {
      setData(data);
      setIsLoading(false);
    })
  }, [listItems, setData])

  const table = useReactTable<T>({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: sortBy
    }
  })

  const create = useCallback(() => {
    if (!createItem || !selected) {
      return
    }
    createItem(selected).then(resp => {
      setData(prev => [resp, ...prev])
      toast.success(`${resourceName} created successfully`);
    }).finally(() => setSelected(defaultPayload))
  }, [createItem, defaultPayload, resourceName, selected, setData])

  const update = useCallback((id: number, item: T) => {
    setData(prev => {
      const i = prev.findIndex(x => x.id === id);
      prev[i] = item;
      return [...prev];
    });
  }, [])

  const remove = useMemo(() => deleteItem && ((id: number) => {
    deleteItem({id: id}).then(() => {
        setData(prev => prev.filter(x => x.id !== id));
        toast.success(`${resourceName} deleted successfully`);
    })
  }), [deleteItem, resourceName, setData])

  useEffect(() => {
    if (table) {
      table.setGlobalFilter(search);
    }
  }, [search, table])

  const setField = useCallback<SetField<T>>((field, value) => {
    setSelected(prev => prev ? ({...prev, [field]: value}) : undefined)
  }, [])

  return (
    <>
      {
        resourceName && <PageHeader title={resourceName}>
          {
            SaveComponent && <Dialog.Root>
                  <Dialog.Trigger>
                      <Button><FontAwesomeIcon icon={faPlus}/> Create {resourceName}</Button>
                  </Dialog.Trigger>
                  <Dialog.Content>
                      <Dialog.Title>Create {resourceName}</Dialog.Title>

                      <SaveComponent selected={selected}  setField={setField}/>

                      <div className="flex justify-end gap-3 mt-4">
                          <Dialog.Close>
                              <Button variant="soft" color="gray">
                                  Cancel
                              </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                              <Button onClick={create}> Create {resourceName}</Button>
                          </Dialog.Close>
                      </div>
                  </Dialog.Content>
              </Dialog.Root>
          }
          </PageHeader>
      }

      <div>
        <div className="flex items-center justify-end mb-3">
          <TextField.Root onChange={e => setSearch(e.target.value)} size="2" placeholder="Zoeken ...">
            <TextField.Slot>
              <FontAwesomeIcon icon={faSearch} height="16" width="16"/>
            </TextField.Slot>
          </TextField.Root>
        </div>

        <DataTable table={table} update={update} deleteItem={remove} resourceName={resourceName}
                   allowEdit={!!SaveComponent} pageMaxSize={pageMaxSize} isLoading={isLoading}>
          {children}
        </DataTable>

      </div>
    </>
  );
}
