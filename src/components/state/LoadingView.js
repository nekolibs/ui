import { Loading } from './Loading'
import { View } from '../structure/View'

export function LoadingView({ active, children, size, color, replaceChildren, noWrapper, ...props }) {
  if (!active && !!noWrapper) return children
  if (!active) return <View {...props}>{children}</View>

  const loader = <Loading size={size} color={color} />
  if (!!replaceChildren && !!noWrapper) return loader
  if (!!replaceChildren) {
    return (
      <View {...props} center>
        {loader}
      </View>
    )
  }

  return (
    <View className="neko-loading-view" relative {...props}>
      {children}
      <View
        className="neko-laoding-view-overlay"
        bg="mainBG_op90"
        absolute
        top={0}
        left={0}
        right={0}
        bottom={0}
        center
      >
        {loader}
      </View>
    </View>
  )
}

export const LoadingWrapper = LoadingView
