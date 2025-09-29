import { AbsView } from './View'

let AbsBlurView

try {
  const { BlurView } = require('expo-blur') || {}
  AbsBlurView = ({ intensity, tint, disabledForAndroid, style, children, ...props }) => {
    return (
      <BlurView
        intensity={intensity}
        tint={tint}
        style={[style, { overflow: 'hidden' }]}
        experimentalBlurMethod={disabledForAndroid ? 'none' : 'dimezisBlurView'}
      >
        {children}
      </BlurView>
    )

    // return (
    // <AbsView style={[style, { overflow: 'hidden' }]} {...props}>
    // <BlurView
    // intensity={intensity}
    // tint={tint}
    // style={[style, { width: '100%' }]}
    // experimentalBlurMethod={disabledForAndroid ? 'none' : 'dimezisBlurView'}
    // >
    // {children}
    // </BlurView>
    // </AbsView>
    // )
  }
} catch {
  AbsBlurView = (props) => {
    console.warn('expo-blur not instaled.')
    return <AbsView {...props} />
  }
}

export { AbsBlurView }
