export function AbsTable({ children, style, ...props }) {
  return (
    <table
      {...props}
      style={{
        ...style,
        borderCollapse: 'separate',
        borderSpacing: 0,
        // orderCollapse: 'collapse',
        // whiteSpace: 'nowrap',
        width: '100%',
      }}
    >
      <tbody>{children}</tbody>
    </table>
  )
}

export function AbsTableRow({ ...props }) {
  return <tr {...props} />
}

export function AbsTableHeader({ ...props }) {
  return <th {...props} />
}

export function AbsTableCol({ ...props }) {
  return <td {...props} />
}
