export function AbsTable({ children, ...props }) {
  return (
    <table {...props}>
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
