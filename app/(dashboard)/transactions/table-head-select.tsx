import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

type Props = {
  columnIndex: number,
  selectedColumn: Record<string, string | null>
  onChange: (columnIndex: number, value: string | null) => void
}

const options = [
  "amount",
  "payee",
  "notes",
  "date"
]

export const TableHeadSelect = ({ columnIndex, selectedColumn, onChange }: Props) => {

  const currentSelection = selectedColumn[`columns_${columnIndex}`]

  return (
    <Select
      value={currentSelection || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger className={cn(
        "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
        currentSelection && "text-blue-500"
      )}>
        <SelectValue placeholder='Skip' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">
          Skip
        </SelectItem>
        {options.map((option, index) => {
          // makes sure that the option selected in one column cannot be used in ohter column
          const disabled = Object.values(selectedColumn)
            .includes(option) && selectedColumn[`columns_${columnIndex}`] !== option


          return (
            <SelectItem
              key={index}
              value={option}
              disabled={disabled}
              className="capitalize"
            >
              {option}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}