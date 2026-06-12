import { NumberInput } from './NumberInput'

export function WheelPicker({
  value,
  onChange,
  options,
  suffix,
  range,
  step = 1,
  labelKey = 'label',
  valueKey = 'value',
  useRawOption,
  formatLabel,
  ...props
}) {
  let min = 0
  let max = 100

  if (!!range || !options) {
    const [from, to] = range || [0, 100]
    const count = Math.floor((to - from) / step) + 1
    options = Array.from({ length: count }, (_, i) => {
      const v = from + i * step
      return { [labelKey]: formatLabel ? formatLabel(v) : v, [valueKey]: v }
    })
  }

  const values = (options || []).map((o) => o[valueKey]).filter((v) => typeof v === 'number')
  if (values.length) {
    min = Math.min(...values)
    max = Math.max(...values)
  }

  function handleChange(newValue) {
    if (useRawOption) {
      // NumberInput allows free typing — snap to the nearest option on miss
      const match = options.find((o) => o[valueKey] === newValue)
      return onChange(
        match ||
          options.reduce((best, o) =>
            Math.abs(o[valueKey] - newValue) < Math.abs(best[valueKey] - newValue) ? o : best
          )
      )
    }
    onChange(newValue)
  }

  return <NumberInput value={value} onChange={handleChange} suffix={suffix} min={min} max={max} precision={0} {...props} />
}
