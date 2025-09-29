import { mapObjIndexed, mergeDeepRight, values, pipe, filter } from 'ramda'

import { DEFAULT_THEMES, useThemeHandler } from '../../theme'
import { IconLabel } from '../presentation'
import { Link } from '../actions'
import { Picker } from '../inputs'
import { ThemeThumb } from './ThemeThumb'

export function ThemePicker({ onChange, onlyKeys, hideKeys }) {
  const { activeThemeKey, setActiveThemeKey, themes, onChangeTheme } = useThemeHandler()

  let options = pipe(
    mergeDeepRight(DEFAULT_THEMES),
    mapObjIndexed((obj, key) => ({ ...obj, value: key, key })),
    values,
    filter((item) => {
      if (item.value === '_all') return false
      if (onlyKeys && onlyKeys.includes(item.value)) return true
      if (hideKeys && hideKeys.includes(item.value)) return false
      return true
    })
  )(themes)

  return (
    <Picker
      colSpan={12}
      gap="lg"
      value={activeThemeKey}
      onChange={(key) => {
        setActiveThemeKey(key)
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
