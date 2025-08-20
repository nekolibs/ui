export function AbsView({ onPress, onClick, ...props }) {
  return <div onClick={onClick || onPress} {...props} />
}
