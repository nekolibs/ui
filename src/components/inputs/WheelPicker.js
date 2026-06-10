import { NumberInput } from './NumberInput'

export function WheelPicker({ value, onChange, options, suffix, range, step = 1, ...props }) {
  let min = 0
  let max = 100

  if (!!range || !options) {
    const [from, to] = range || [0, 100]
    const count = Math.floor((to - from) / step) + 1
    options = Array.from({ length: count }, (_, i) => {
      const v = from + i * step
      return { value: v, label: v }
    })
  }

  if (options?.length) {
    const values = options.map((o) => o.value).filter((v) => typeof v === 'number')
    min = Math.min(...values)
    max = Math.max(...values)
  }

  return <NumberInput value={value} onChange={onChange} suffix={suffix} min={min} max={max} precision={0} {...props} />
}
