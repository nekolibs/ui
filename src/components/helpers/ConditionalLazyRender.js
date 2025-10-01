import { LazyRender } from './LazyRender'

export function ConditionalLazyRender({ children, ...props }) {
  if (!props.delay && !props.whenVisible && !props.destroyOffScreen) return children
  return <LazyRender {...props}>{children}</LazyRender>
}
