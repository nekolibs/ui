export function AbsTextInput({ onChange, multiline, rows, ...props }) {
  if (multiline) {
    return (
      <textarea
        rows={rows}
        onChange={(e) => onChange?.(e?.target?.value, e)}
        {...props}
      />
    )
  }
  return <input type="text" onChange={(e) => onChange?.(e?.target?.value, e)} {...props} />
}
