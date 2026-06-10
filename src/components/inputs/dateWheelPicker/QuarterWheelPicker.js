import { useMemo } from 'react'
import dayjs from 'dayjs'

import { ClearLink } from '../../actions/ClearLink'
import { View } from '../../structure'
import { WheelPicker } from '../WheelPicker'

const QUARTERS = [
  { value: 1, label: 'Q1' },
  { value: 2, label: 'Q2' },
  { value: 3, label: 'Q3' },
  { value: 4, label: 'Q4' },
]

function getYearOptions(min, max) {
  const minYear = min ? dayjs(min).year() : dayjs().year() - 100
  const maxYear = max ? dayjs(max).year() : dayjs().year() + 100
  const options = []
  for (let y = minYear; y <= maxYear; y++) options.push({ value: y, label: String(y) })
  return options
}

export function QuarterWheelPicker({ value, onChange, min, max, allowClear }) {
  const current = value ? dayjs(value) : dayjs()
  const quarter = Math.floor(current.month() / 3) + 1
  const year = current.year()

  const yearOptions = useMemo(() => getYearOptions(min, max), [min, max])

  const handleQuarterChange = (q) => {
    onChange?.(
      dayjs()
        .year(year)
        .month((q - 1) * 3)
        .startOf('month')
    )
  }

  const handleYearChange = (y) => {
    onChange?.(
      dayjs()
        .year(y)
        .month((quarter - 1) * 3)
        .startOf('month')
    )
  }

  return (
    <View>
      <View row>
        <View flex>
          <WheelPicker options={QUARTERS} value={quarter} onChange={handleQuarterChange} />
        </View>
        <View flex>
          <WheelPicker options={yearOptions} value={year} onChange={handleYearChange} />
        </View>
      </View>
      <ClearLink hide={!allowClear} value={value} onChange={onChange} />
    </View>
  )
}
