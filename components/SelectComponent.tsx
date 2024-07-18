import { boolean } from "drizzle-orm/mysql-core"
import { useMemo } from "react"
import { SingleValue } from 'react-select'
import CreatableSelect from 'react-select/creatable'

type Props = {
  onChange: (value?: string) => void
  onCreate: (value: string) => void
  options?: { label: string, value: string }[]
  value?: string | null | undefined
  disabled?: boolean
  placeholder?: string
}

export const Select = (
  { value,
    onChange,
    disabled,
    onCreate,
    options = [],
    placeholder }: Props
) => {
  const onSelect = (
    option: SingleValue<{ label: string, value: string }>
  ) => {
    onChange(option?.value)
  }

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value == value)
  }, [options, value])

  return (
    <CreatableSelect
      placeholder={placeholder}
      className="text-sm h-18"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0"
          }
        })
      }}
      value={formattedValue}
      onChange={onSelect}
      options={options}
      // create new options along with the existing ones by eventually calling the mutate fn here oncreate
      onCreateOption={onCreate}
      isDisabled={disabled}
    />

  )
}