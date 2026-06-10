import { useMemo } from 'react'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/esm/plugin/weekOfYear'

import { ClearLink } from '../../actions/ClearLink'
import { View } from '../../structure'
import { WheelPicker } from '../WheelPicker'

dayjs.extend(weekOfYear)

function getWeekOptions(year) {
  const options = []
  let d = dayjs().year(year).startOf('year').startOf('week')

  while (d.year() <= year) {
    const weekStart = d
    const weekEnd = d.endOf('week')
    const label = `W${d.week()}  ${weekStart.format('MMM D')} - ${weekEnd.format('MMM D')}`
    options.push({ value: d.week(), label, date: weekStart })
    d = d.add(1, 'week')
  }

  return options
}

function getYearOptions(min, max) {
  const minYear = min ? dayjs(min).year() : dayjs().year() - 100
  const maxYear = max ? dayjs(max).year() : dayjs().year() + 100
  const options = []
  for (let y = minYear; y <= maxYear; y++) options.push({ value: y, label: String(y) })
  return options
}

export function WeekWheelPicker({ value, onChange, min, max, allowClear }) {
  const current = value ? dayjs(value) : dayjs()
  const week = current.week()
  const year = current.year()

  const weekOptions = useMemo(() => getWeekOptions(year), [year])
  const yearOptions = useMemo(() => getYearOptions(min, max), [min, max])

  const handleWeekChange = (w) => {
    const opt = weekOptions.find((o) => o.value === w)
    if (opt) onChange?.(opt.date.startOf('week'))
  }

  const handleYearChange = (y) => {
    const newWeeks = getWeekOptions(y)
    const closest = newWeeks.find((o) => o.value === week) || newWeeks[0]
    onChange?.(closest.date.startOf('week'))
  }

  return (
    <View>
      <View row>
        <View flex>
          <WheelPicker options={weekOptions} value={week} onChange={handleWeekChange} />
        </View>
        <View width={120}>
          <WheelPicker options={yearOptions} value={year} onChange={handleYearChange} />
        </View>
      </View>
      <ClearLink hide={!allowClear} value={value} onChange={onChange} />
    </View>
  )
}
