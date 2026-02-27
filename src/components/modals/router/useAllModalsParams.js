import { useModalsStackContext } from './ModalsRouterContext'

export function useAllModalsParams() {
  const { stack } = useModalsStackContext()
  return (stack || []).map(({ path, params, key }) => ({ path, params, key }))
}
