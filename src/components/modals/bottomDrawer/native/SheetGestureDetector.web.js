// Web: no whole-sheet drag. react-native-gesture-handler stamps
// `touch-action: none` on any node it wraps, which disables the browser's
// native scrolling for the whole subtree — so wrapping the sheet would block
// the list's touch scroll. The sheet closes via backdrop tap / selecting an
// option instead.
export function SheetGestureDetector({ children }) {
  return children
}
