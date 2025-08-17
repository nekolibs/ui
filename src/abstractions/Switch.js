import { useCallback } from 'react'

export function AbsSwitch({
  value = false,
  onValueChange = () => {},
  disabled = false,
  trackColor = { false: '#767577', true: '#81b0ff' },
  thumbColor,
  height = 32,
  style,
  ...rest
}) {
  const isOn = !!value

  const handleToggle = useCallback(() => {
    if (disabled) return
    onValueChange(!isOn)
  }, [disabled, isOn, onValueChange])

  const onKeyDown = useCallback(
    (e) => {
      if (disabled) return
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onValueChange(!isOn)
      }
      if (e.key === 'ArrowLeft' && isOn) onValueChange(false)
      if (e.key === 'ArrowRight' && !isOn) onValueChange(true)
    },
    [disabled, isOn, onValueChange]
  )

  const trackOff = (trackColor && trackColor.false) || '#76757750'
  const trackOn = (trackColor && trackColor.true) || '#81b0ff'
  const currentTrack = isOn ? trackOn : trackOff

  const defaultThumb = '#ffffff'
  const currentThumb = thumbColor || defaultThumb

  const width = 1.7 * height
  const padding = 2
  const thumbSize = height - padding * 2
  const translateX = isOn ? width - thumbSize - padding * 2 : 0

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-disabled={disabled}
      onClick={handleToggle}
      onKeyDown={onKeyDown}
      disabled={disabled}
      style={{
        WebkitTapHighlightColor: 'transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        background: 'transparent',
        border: 'none',
        padding: 0,
        margin: 0,
        outline: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        ...style,
      }}
      {...rest}
    >
      <span
        aria-hidden
        style={{
          position: 'relative',
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: currentTrack,
          transition: 'background-color 150ms ease',
          _opacity: disabled ? 0.6 : 1,
          display: 'inline-block',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: padding,
            left: padding + translateX,
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: currentThumb,
            boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 1px 1px rgba(0,0,0,0.1)',
            transition: 'left 150ms ease, background-color 150ms ease',
          }}
        />
      </span>
    </button>
  )
}
