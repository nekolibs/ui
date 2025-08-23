export const useOverlay = () => ({})

// Not needed for native since components like Popover handle their own modals
export function OverlayHandler({ children }) {
  return children
}
