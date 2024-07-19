import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableHeadSelect } from "./table-head-select"



type Props = {
  headers: string[]
  body: string[][]
  selectedColumn: Record<string, string | null>
  onTableHeadSelectChange: (columnIndex: number, value: string | null) => void
}

export const ImportTable = ({ headers, body, selectedColumn, onTableHeadSelectChange }: Props) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((items, index) => (
              <TableHead key={index}>
                <TableHeadSelect
                  columnIndex={index}
                  selectedColumn={selectedColumn}
                  onChange={onTableHeadSelectChange}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row: string[], index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}