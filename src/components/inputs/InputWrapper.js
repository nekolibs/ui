import { pipe, is } from 'ramda'
import React from 'react'

import { Icon } from '../presentation/Icon'
import { Loading } from '../state/Loading'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { useDefaultModifier } from '../../modifiers/default'
import { useSizeConverter } from '../../modifiers/sizeConverter'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  fullW: '100%', //
  paddingH: 'sm',
  bg: 'overlayBG',
  border: true,
  br: 'md',
  row: true,
  gap: 'sm',
}

export function InputWrapper({
  prefix,
  suffix,
  prefixIcon,
  prefixIconColor,
  suffixIcon,
  suffixIconColor,
  loading,
  error,
  children,
  ref,
  ...rootProps
}) {
  const [hover, setHover] = React.useState(false)
  const fallbackInputRef = React.useRef()
  const inputRef = ref || fallbackInputRef
  const [{ size, sizeCode }, props] = pipe(
    useSizeConverter('elementHeights', 'md'),
    useThemeComponentModifier('InputWrapper'),
    useDefaultModifier(DEFAULT_PROPS)
  )([{}, rootProps])

  const handlePress = () => {
    inputRef?.current?.focus?.()
  }

  if (!!prefix && is(String, prefix)) prefix = <Text>{prefix}</Text>
  if (!!suffix && is(String, suffix)) suffix = <Text>{suffix}</Text>
  if (!prefix && !!prefixIcon) prefix = <Icon name={prefixIcon} size={sizeCode} color={prefixIconColor} />
  if (!suffix && !!suffixIcon) suffix = <Icon name={suffixIcon} size={sizeCode} color={suffixIconColor} />
  if (!prefix && !!error) suffix = <Icon name="close-circle-fill" size={sizeCode} red />
  if (!!loading) suffix = <Loading size={sizeCode} />

  let borderColor = !!hover ? 'primary_op40' : 'divider'
  if (!!error) borderColor = 'red_op40'

  const child = React.Children.only(children)
  const childWithProps = React.cloneElement(child, {
    ...child.props,
    ref: inputRef,
  })

  return (
    <View
      className="neko-input-wrapper"
      height={size}
      onPress={handlePress}
      borderColor={borderColor}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {!!prefix && (
        <View paddingV={5} fullHeight center>
          {prefix}
        </View>
      )}

      <View flex fullH>
        {childWithProps}
      </View>

      {!!suffix && (
        <View paddingV={5} fullHeight center>
          {suffix}
        </View>
      )}
    </View>
  )
}
