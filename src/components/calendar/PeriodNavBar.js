import React from 'react'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/esm/plugin/quarterOfYear'

import { InfiniteCarousel } from '../carousel/InfiniteCarousel'
import { Link } from '../actions/Link'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { isDateDisabled } from './_helpers/dateDisabled'

dayjs.extend(quarterOfYear)

function getWeekEpoch() {
  return dayjs('2000-01-01').startOf('week')
}

const TYPES = {
  day: {
    count: 7,
    unit: 'day',
    toPageValue(date) {
      return date.startOf('week').diff(getWeekEpoch(), 'week')
    },
    getItems(pageValue) {
      const weekStart = getWeekEpoch().add(pageValue, 'week')
      return Array.from({ length: 7 }, (_, i) => {
        const d = weekStart.add(i, 'day')
        return { key: d.valueOf(), date: d, label: d.format('ddd'), sublabel: String(d.date()) }
      })
    },
  },
  week: {
    count: 7,
    unit: 'week',
    toPageValue(date) {
      const weekIndex = date.startOf('week').diff(getWeekEpoch(), 'week')
      return Math.floor(weekIndex / 7)
    },
    getItems(pageValue) {
      return Array.from({ length: 7 }, (_, i) => {
        const weekIndex = pageValue * 7 + i
        const d = getWeekEpoch().add(weekIndex, 'week')
        const end = d.add(6, 'day')
        return { key: d.valueOf(), date: d, label: `${d.date()}-${end.date()}`, sublabel: d.format('MMM') }
      })
    },
  },
  month: {
    count: 7,
    unit: 'month',
    toPageValue(date) {
      const absMonth = date.year() * 12 + date.month()
      return Math.floor(absMonth / 7)
    },
    getItems(pageValue) {
      return Array.from({ length: 7 }, (_, i) => {
        const absMonth = pageValue * 7 + i
        const year = Math.floor(absMonth / 12)
        const month = absMonth % 12
        const d = dayjs().year(year).month(month).startOf('month')
        return { key: d.valueOf(), date: d, label: d.format('MMM'), sublabel: d.format("'YY") }
      })
    },
  },
  quarter: {
    count: 4,
    unit: 'quarter',
    toPageValue(date) {
      return date.year()
    },
    getItems(pageValue) {
      return Array.from({ length: 4 }, (_, i) => {
        const d = dayjs().year(pageValue).month(i * 3).startOf('month')
        return { key: d.valueOf(), date: d, label: `Q${i + 1}`, sublabel: String(pageValue) }
      })
    },
  },
  year: {
    count: 7,
    unit: 'year',
    toPageValue(date) {
      return Math.floor(date.year() / 7)
    },
    getItems(pageValue) {
      return Array.from({ length: 7 }, (_, i) => {
        const year = pageValue * 7 + i
        const d = dayjs().year(year).startOf('year')
        return { key: d.valueOf(), date: d, label: String(year), sublabel: null }
      })
    },
  },
}

const PeriodSlide = React.memo(function PeriodSlide({ items, value, unit, onChange, min, max, onCheckDisabled }) {
  return (
    <View row center gap="xs">
      {items.map((item) => {
        const isActive = !!value && dayjs(value).isSame(item.date, unit)
        const disabled = isDateDisabled(item.date, { min, max, onCheckDisabled })

        return (
          <Link
            key={item.key}
            flex
            center
            br="md"
            paddingV="xs"
            onPress={() => onChange(item.date)}
            bg={isActive && 'primary'}
            disabled={disabled}
          >
            <Text sm center strong={isActive} text2={!isActive}>
              {item.label}
            </Text>
            {item.sublabel && (
              <Text xxs center text4={!isActive} strong={isActive}>
                {item.sublabel}
              </Text>
            )}
          </Link>
        )
      })}
    </View>
  )
})

export function PeriodNavBar({ type = 'day', value, onChange, min, max, onCheckDisabled, ...props }) {
  const config = TYPES[type]
  const [localValue, setLocalValue] = React.useState(value)
  const resolvedValue = value === undefined ? localValue : value

  const [currentPage, setCurrentPage] = React.useState(() => {
    const date = resolvedValue ? dayjs(resolvedValue) : dayjs()
    return config.toPageValue(date)
  })

  React.useEffect(() => {
    const date = resolvedValue ? dayjs(resolvedValue) : dayjs()
    setCurrentPage(TYPES[type].toPageValue(date))
  }, [resolvedValue, type])

  const handleSelect = React.useCallback(
    (date) => {
      setLocalValue(date)
      onChange?.(date)
    },
    [onChange]
  )

  const minPage = min ? config.toPageValue(dayjs(min)) : undefined
  const maxPage = max ? config.toPageValue(dayjs(max)) : undefined

  const renderSlide = (pageValue) => (
    <PeriodSlide
      items={config.getItems(pageValue)}
      value={resolvedValue}
      unit={config.unit}
      onChange={handleSelect}
      min={min}
      max={max}
      onCheckDisabled={onCheckDisabled}
    />
  )

  return (
    <View className="neko-period-nav-bar" {...props}>
      <InfiniteCarousel
        value={currentPage}
        onChange={setCurrentPage}
        renderSlide={renderSlide}
        min={minPage}
        max={maxPage}
      />
    </View>
  )
}
