import { mapObjIndexed, values, pipe, reject, propEq } from 'ramda'

import { useAllThemes, useThemeHandler } from '../../theme'
import { IconLabel } from '../presentation'
import { Link } from '../actions'
import { Picker } from '../inputs'
import { ThemeThumb } from './ThemeThumb'

export function ThemePicker({ onChange }) {
  const { activeThemeKey, onChangeTheme } = useThemeHandler()
  const allThemes = useAllThemes()

  const options = pipe(
    mapObjIndexed((obj, key) => ({ ...obj, value: key, key })),
    values,
    reject(propEq('_all', 'value'))
  )(allThemes)

  return (
    <Picker
      colSpan={12}
      gap="lg"
      value={activeThemeKey}
      onChange={(key) => {
        onChangeTheme?.(key)
        onChange?.(key)
      }}
      options={options}
      renderOption={({ option, selected, onChange }) => (
        <Link onPress={onChange} gap="xs">
          <ThemeThumb value={option.value} />
          <IconLabel
            center
            label={option.label}
            icon={selected && 'checkbox-circle-fill'}
            color={selected ? 'primary' : 'text3'}
            strong
          />
        </Link>
      )}
    />
  )
}
