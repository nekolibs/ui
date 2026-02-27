import { useModalRouteContext } from './ModalsRouterContext'

export function useModalParams() {
  const { params } = useModalRouteContext()
  return params || {}
}
