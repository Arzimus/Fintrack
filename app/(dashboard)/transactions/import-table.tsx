import { Table, TableHeader, TableRow } from "@/components/ui/table"



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

          </TableRow>
        </TableHeader>
      </Table>
    </div>
  )
}