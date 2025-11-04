import { pipe } from 'ramda'

import { Button } from '../actions'
import { Picker } from './Picker'
import { View } from '../structure'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useDefaultModifier } from '../../modifiers/default'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = ([{ sizeCode }]) => ({
  gap: 1,
  br: sizeCode,
  minHeight: sizeCode,
  bg: 'overlayBG',
  padding: 2,
  wrap: false,
  row: true,
  border: true,
  buttonProps: {
    fullH: true,
    size: sizeCode,
  },
})

function PickerWrapper({ renderItem, options, ...props }) {
  return (
    <View row>
      <View {...props}>{options?.map?.((option) => renderItem(option))}</View>
    </View>
  )
}

export function SegmentedPicker({ ...rootProps }) {
  const [{ sizeCode }, formattedProps] = pipe(
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('SegmentPicker'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const { buttonProps, color, ...props } = formattedProps

  return (
    <Picker
      className="neko-segmented-picker"
      Wrapper={PickerWrapper}
      {...props}
      renderOption={({ option, selected, onChange, labelKey, ...props }) => (
        <Button
          label={option[labelKey]}
          onPress={onChange}
          color={selected ? color || 'primary' : rootProps?.bg || 'overlayBG'}
          round={rootProps?.round}
          textProps={{ strong: selected }}
          opacity={!selected && 0.8}
          {...option}
          {...buttonProps}
        />
      )}
    />
  )
}
