export function AbsTouchableOpacity({ link, onPress, onClick, ...props }) {
  const Component = link ? 'a' : 'button'
  return <Component onClick={onClick || onPress} {...props} />
}
