let AbsIcon

try {
  const RmIcon = require('react-native-remix-icon')?.default
  console.log(RmIcon)
  AbsIcon = (props) => <RmIcon {...props} />
} catch {
  AbsIcon = () => false
}

export { AbsIcon }
