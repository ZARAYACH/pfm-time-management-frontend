import {AlertDialog, Button, Checkbox, IconButton, Select, Table, Text} from "@radix-ui/themes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDownWideShort, faArrowUpWideShort, faPen, faSort, faTrash} from "@fortawesome/free-solid-svg-icons";
import {flexRender} from "@tanstack/react-table";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import {ReactElement, useCallback, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {Table as TTable} from "@tanstack/table-core";
import TableSkeleton from "@components/common/TableSkeleton";

const pageSizes = [5, 10, 20, 50, 100]

export type HandlePageClick = (event: { selected: number }) => void
export type Update<T> = (id: number, item: T) => void

interface DataTableProps<T> {
  table: TTable<T>,
  deleteItem?: (id: number | string) => void,
  resourceName?: string,
  pageMaxSize?: number,
  update?: Update<T>,
  allowEdit?: boolean,
  children?: (item: T, update?: Update<T>) => ReactElement,
  isLoading: boolean;
}

export default function DataTable<T extends { id?: number | string }>
({
   table,
   deleteItem,
   resourceName,
   pageMaxSize,
   children,
   update,
   allowEdit = true,
   isLoading
 }: DataTableProps<T>) {
  const pathname = usePathname()

  const [pageSize, setPageSize] = useState(pageMaxSize ?? pageSizes[1])

  const handlePageClick = useCallback<HandlePageClick>((event) => {
    table.setPageIndex(event.selected)
  }, [table]);

  useEffect(() => {
    if (table) {
      table.setPageSize(pageSize);
    }
  }, [table, pageSize])

  return <>
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell className="w-2">
            <Checkbox checked={table.getIsSomeRowsSelected() ? "indeterminate" : table.getIsAllPageRowsSelected()}
                      onCheckedChange={e => table.getToggleAllRowsSelectedHandler()({target: {checked: e}})}/>
          </Table.ColumnHeaderCell>
          {
            table.getHeaderGroups().length && table.getHeaderGroups()[0].headers.map(header => (
              <Table.ColumnHeaderCell className="whitespace-nowrap" key={header.id}>
                {header.column.columnDef.header?.toString()}
                <span onClick={header.column.getToggleSortingHandler()}
                      className="ml-2 p-1 cursor-pointer">
                  {!header.column.getIsSorted() && <FontAwesomeIcon icon={faSort}/>}
                  {header.column.getIsSorted() === 'asc' && <FontAwesomeIcon icon={faArrowUpWideShort}/>}
                  {header.column.getIsSorted() === 'desc' && <FontAwesomeIcon icon={faArrowDownWideShort}/>}
                </span>
              </Table.ColumnHeaderCell>
            ))
          }
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
      {
        isLoading 
        ? <TableSkeleton rows={5} cols={table.getHeaderGroups()[0].headers.length + 2}/>
        : table.getRowModel().rows.length == 0
            ? <Table.Row>
                <Table.Cell className="text-center" colSpan={table.getHeaderGroups()[0].headers.length + 2}>
                  <Text color="gray">No Data</Text>
                </Table.Cell>
              </Table.Row>
            : table.getRowModel().rows.map(row => (
              <Table.Row key={row.id}>
                <Table.RowHeaderCell>
                  <Checkbox checked={row.getIsSelected()} onCheckedChange={row.getToggleSelectedHandler()}/>
                </Table.RowHeaderCell>

                {
                  row.getVisibleCells().map(cell =>
                    <Table.Cell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Cell>)
                }

                <Table.Cell>
                  <div className="flex justify-end gap-3">

                    {children?.(row.original, update)}

                    {
                      allowEdit && <Link href={`${pathname}/${row.original.id}`}>
                            <IconButton variant="soft">
                                <FontAwesomeIcon icon={faPen}/>
                            </IconButton>
                        </Link>
                    }

                    {
                      deleteItem && <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <IconButton color="crimson" variant="soft">
                                    <FontAwesomeIcon icon={faTrash}/>
                                </IconButton>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Delete {resourceName}</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Are you sure you want to delete this {resourceName}
                                </AlertDialog.Description>
                                <div className="flex justify-end gap-3 mt-5">
                                    <AlertDialog.Cancel>
                                        <Button variant="soft" color="gray">Cancel</Button>
                                    </AlertDialog.Cancel>
                                  {
                                    row.original.id && row.original.id != 0 && <AlertDialog.Action>
                                          <Button onClick={() => deleteItem(row.original.id!)} variant="solid"
                                                  color="red">Delete {resourceName}</Button>
                                      </AlertDialog.Action>
                                  }
                                </div>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    }
                  </div>
                </Table.Cell>
              </Table.Row>
            ))
          }
      </Table.Body>
    </Table.Root>

    <div className="flex justify-between mt-2">
      <label>
        <Text size="2" mb="1" mr="3">Page size:</Text>
        <Select.Root onValueChange={(setPageSize as unknown as (value: string) => void)}
                     value={pageSize as unknown as string}>
          <Select.Trigger/>
          <Select.Content align="start" position="popper">
            {
              pageSizes.map(i => (<Select.Item key={i} value={i as unknown as string}>{i}</Select.Item>))
            }
          </Select.Content>
        </Select.Root>
      </label>

      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={table.getPageCount()}
        previousLabel="<"
        renderOnZeroPageCount={null}
        className="flex border-2 rounded-md"
        pageLinkClassName="block py-1 px-3"
        pageClassName="border-r-2"
        nextLinkClassName="block py-1 px-3"
        previousLinkClassName="block py-1 px-3"
        previousClassName="border-r-2"
        breakLinkClassName="block py-1 px-3"
        breakClassName="border-r-2"
        activeClassName="bg-[var(--accent-a3)] text-accent font-bold"
      />
    </div>
  </>
}