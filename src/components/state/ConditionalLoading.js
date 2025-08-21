import { Loading } from './Loading'

export function ConditionalLoading({ children, active, ...props }) {
  if (active) return <Loading {...props} />
  return children
}
