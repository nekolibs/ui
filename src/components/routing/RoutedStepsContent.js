import { ActiveStepContent } from '../steps'
import { View } from '../structure'

// Plain ReactJS (Vite/Next/CRA) fallback — no react-navigation. Renders the active step in place,
// driven by StepsHandler's activeIndex, so a wizard built with these pieces still works on plain web
// (just without native stack transitions). React Native / RNW use the .native variant.
let warned = false

// eslint-disable-next-line no-unused-vars -- absorb the native-only screenOptions so it doesn't leak onto View
export function RoutedStepsContent({ screenOptions, ...props }) {
  if (!warned) {
    warned = true
    console.warn('RoutedStepsContent is native-only (react-navigation). Rendering steps in place on plain web.')
  }

  return (
    <View flex {...props}>
      <ActiveStepContent />
    </View>
  )
}
