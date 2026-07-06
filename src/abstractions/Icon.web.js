let AbsIcon

try {
  const RmIcon = require('react-native-remix-icon')?.default
  // require can succeed while `.default` is undefined (interop / cold-bundle
  // init order across require-cycles) — guard it so we degrade instead of
  // crashing at render with "Element type is invalid".
  if (!RmIcon) throw new Error('react-native-remix-icon: no default export')
  AbsIcon = (props) => <RmIcon {...props} />
} catch {
  AbsIcon = () => {
    console.warn('react-native-remix-icon not installed / no default export.')
    return false
  }
}

export { AbsIcon }
