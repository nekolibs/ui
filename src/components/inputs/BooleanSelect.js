import { Select } from './Select'

export function BooleanSelect({ trueLabel = 'True', falseLabel = 'False', placeholder, ...props }) {
  return (
    <Select
      placeholder={placeholder}
      options={[
        { label: trueLabel, value: true },
        { label: falseLabel, value: false },
      ]}
      {...props}
    />
  )
}
