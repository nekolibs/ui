import { StatusBar } from 'react-native'

import { useTheme } from '../../theme'

export function ThemeStatusBar(props) {
  const { isDark } = useTheme()

  return <StatusBar {...props} style={isDark ? 'dark' : 'light'} />
}
