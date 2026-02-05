export function useReanimatedScroll() {
  if (!context) console.error('useReanimatedScroll its not supported for neko web')
  return null
}

export function ReanimatedScrollHandler({ children }) {
  return children
}
