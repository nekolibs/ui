import { useModalsRouterContext } from './ModalsRouterContext'

export function useModalsNavigation() {
  const { push, goBack, closeAll } = useModalsRouterContext()
  return { push, goBack, closeAll }
}
