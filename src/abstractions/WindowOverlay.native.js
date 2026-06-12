import { Platform } from 'react-native'

let AbsWindowOverlay = ({ children }) => children

// iOS native-stack modals (presentation: 'modal') present a UIViewController above
// the RN root view, covering anything rendered inside it regardless of zIndex.
// FullWindowOverlay renders above presented view controllers and passes touches
// through empty areas. On Android/web screens stay in the same window, so the
// passthrough is enough.
if (Platform.OS === 'ios') {
  try {
    const { FullWindowOverlay } = require('react-native-screens') || {}
    if (FullWindowOverlay) {
      AbsWindowOverlay = ({ children }) => <FullWindowOverlay>{children}</FullWindowOverlay>
    }
  } catch {
    console.warn('react-native-screens not installed. Notifications may render behind native iOS modals.')
  }
}

export { AbsWindowOverlay }
