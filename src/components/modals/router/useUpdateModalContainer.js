import { useModalRouteContext } from './ModalsRouterContext'

export function useUpdateModalContainer() {
  const { updateContainer } = useModalRouteContext()
  return updateContainer
}
