// Web: the sheet itself is not a drag target. Drag-to-close is bound to the
// handle instead (see HandleGestureDetector.web) so the pan never covers the
// scrollable list — which would otherwise fight the list's own scrolling. The
// sheet also closes via backdrop tap / selecting an option.
export function SheetGestureDetector({ children }) {
  return children
}
