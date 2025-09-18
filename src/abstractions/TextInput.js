export function AbsTextInput({ onChange, ...props }) {
  return <input type="text" onChange={(e) => onChange?.(e?.target?.value, e)} {...props} />
}
