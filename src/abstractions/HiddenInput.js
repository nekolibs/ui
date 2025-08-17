export function AbsHiddenInput(props) {
  return <input style={{ width: 0, height: 0, position: 'absolute', opacity: 0 }} {...props} />
}
