let AbsIcon

try {
  const RmIcon = require('react-native-remix-icon')?.default
  AbsIcon = (props) => <RmIcon {...props} />
} catch {
  AbsIcon = () => {
    console.warn('react-native-remix-icon not instaled.')
    return false
  }
}

export { AbsIcon }
