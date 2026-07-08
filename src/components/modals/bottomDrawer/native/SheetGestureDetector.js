import { GestureDetector } from 'react-native-gesture-handler'

// Attaches the sheet drag gesture to the whole drawer sheet (native behaviour).
// On native, the inner scroll component (createDrawerScrollComponent) coordinates
// list-scroll vs sheet-drag, so wrapping the entire sheet is fine.
export function SheetGestureDetector({ gesture, children }) {
  return <GestureDetector gesture={gesture}>{children}</GestureDetector>
}
