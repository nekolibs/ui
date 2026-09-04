import { useEffect, useState } from 'react'
import { pipe } from 'ramda'

import { AbsImage } from '../../abstractions/Image'
import { View } from '../structure'
import { Icon } from './Icon'
import { useBorderModifier } from '../../modifiers/border'
import { useDefaultModifier } from '../../modifiers/default'
import { useFlexModifier } from '../../modifiers/flex'
import { useMarginModifier } from '../../modifiers/margin'
import { usePositionModifier } from '../../modifiers/position'
import { useShadowModifier } from '../../modifiers/shadow'
import { useSizeModifier } from '../../modifiers/size'
import { useThemeComponentModifier } from '../../modifiers/themeComponent'

const DEFAULT_PROPS = {
  width: '100%',
  br: 'md',
}

// Shown when the source is missing/empty or fails to load. On by default so images
// degrade gracefully with zero extra code — override with `fallbackIcon="..."`, a
// custom `fallback={<.../>}`, or disable with `fallbackIcon={null}`.
const DEFAULT_FALLBACK_ICON = 'camera-off-line'

export function Image({ name, src, source, fallback, fallbackIcon = DEFAULT_FALLBACK_ICON, onError, ...rootProps }) {
  const [errored, setErrored] = useState(false)
  // Rows get recycled (FlatList) — reset when the source changes so a reused row
  // doesn't stay stuck on a previous image's error. Key on the string uri, not the
  // object ref, to avoid resetting on every render.
  useEffect(() => setErrored(false), [src, source?.uri])

  const hasSource = !!source || (typeof src === 'string' ? src !== '' : src != null)
  const showFallback = (!hasSource || errored) && (fallback != null || fallbackIcon != null)

  const [{ size, color }, props] = pipe(
    useThemeComponentModifier('Image'),
    useDefaultModifier(DEFAULT_PROPS),
    usePositionModifier, //
    useMarginModifier,
    useSizeModifier,
    usePositionModifier,
    useFlexModifier,
    useMarginModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  if (showFallback) {
    // A box matching the image footprint (same size/radius modifiers), centered icon.
    return (
      <View center bg="overlayBG" {...DEFAULT_PROPS} {...rootProps}>
        {fallback ?? <Icon name={fallbackIcon} color="text4" size={size * 0.1} />}
      </View>
    )
  }

  return (
    <AbsImage
      className="neko-image"
      name={name}
      src={src}
      source={source}
      color={color}
      size={size}
      onError={(e) => {
        setErrored(true)
        onError?.(e)
      }}
      {...props}
    />
  )
}
