// Native: the whole sheet drives the drag (see SheetGestureDetector), so the
// handle is not a separate gesture target — render it as-is.
export function HandleGestureDetector({ children }) {
  return children
}
