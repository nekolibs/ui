export function AbsTouchableOpacity({ onPress, onClick, ...props }) {
  return <button onClick={onClick || onPress} {...props} />
}
