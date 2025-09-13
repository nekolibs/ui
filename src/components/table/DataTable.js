import { pipe } from 'ramda'

import { Table } from '..'
import { TableCol } from './TableCol'
import { TableHeader } from './TableHeader'
import { TableHeaderRow } from './TableHeaderRow'
import { TableRow } from './TableRow'
import { useSizeConverter } from '../../modifiers/sizeConverter'

function RowItem({ record, columns, size, grid }) {
  return (
    <TableRow>
      {columns.map(({ render, field, key, label, ...column }, index) => {
        render = render || ((v) => v)
        const value = record[field]

        const colProps = { ...column, size }
        if (!column.borderR && columns.length - 1 > index && grid) colProps.borderR = true

        return (
          <TableCol key={key} {...colProps}>
            {render(value, record)}
          </TableCol>
        )
      })}
    </TableRow>
  )
}

export function DataTable({ data, columns, rowKey = 'key', stickyHeader, grid, ...props }) {
  const [{ sizeCode }, _] = pipe(
    useSizeConverter('padding', 'md') //
  )([{}, props])

  return (
    <Table {...props}>
      <TableHeaderRow sticky={stickyHeader}>
        {columns.map(({ key, ...column }, index) => {
          const headerProps = { ...column, size: sizeCode }
          if (!column.borderR && columns.length - 1 > index && grid) headerProps.borderR = true

          return <TableHeader key={column.key} {...headerProps} />
        })}
      </TableHeaderRow>

      {data.map((record, index) => (
        <RowItem
          key={record[rowKey] || record?.id || index}
          columns={columns}
          record={record}
          size={sizeCode}
          grid={grid}
        />
      ))}
    </Table>
  )
}
