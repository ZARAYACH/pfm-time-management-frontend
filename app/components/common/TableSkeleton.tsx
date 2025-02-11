import {Skeleton, Table} from "@radix-ui/themes";

export default function TableSkeleton({rows, cols}: { rows: number, cols: number }) {
  return Array.from({length: rows}, (v, k) => k).map((x) => (
    <Table.Row key={x}>
      {
        Array.from({length: cols}, (v, k) => k).map((x) => (
          <Table.Cell key={x}>
            <Skeleton width="80px"/>
          </Table.Cell>
        ))
      }
    </Table.Row>
  ))
}