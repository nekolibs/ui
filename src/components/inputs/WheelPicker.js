import { NumberInput } from './NumberInput'

export function WheelPicker({ value, onChange, options, suffix, range, step = 1, ...props }) {
  let min = 0
  let max = 100

  if (range) {
    ;[min, max] = range
  } else if (options?.length) {
    const values = options.map((o) => o.value).filter((v) => typeof v === 'number')
    min = Math.min(...values)
    max = Math.max(...values)
  }

  return <NumberInput value={value} onChange={onChange} suffix={suffix} min={min} max={max} precision={0} {...props} />
}
