import { Select } from './Select'

export function EnabledSelect({ enabledLabel = 'Enabled', disabledLabel = 'Disabled', placeholder, ...props }) {
  return (
    <Select
      placeholder={placeholder}
      options={[
        { label: enabledLabel, value: false },
        { label: disabledLabel, value: true },
      ]}
      {...props}
    />
  )
}
