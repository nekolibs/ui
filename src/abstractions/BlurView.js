import { AbsView } from './View'

const tintMap = {
  light: 'rgba(255,255,255,0.3)',
  dark: 'rgba(0,0,0,0.3)',
  default: 'rgba(255,255,255,0.2)',
  extraLight: 'rgba(255,255,255,0.5)',
  regular: 'rgba(255,255,255,0.3)',
  prominent: 'rgba(255,255,255,0.7)',
  systemUltraThinMaterial: 'rgba(255,255,255,0.1)',
  systemThinMaterial: 'rgba(255,255,255,0.2)',
  systemMaterial: 'rgba(255,255,255,0.3)',
  systemThickMaterial: 'rgba(255,255,255,0.4)',
  systemChromeMaterial: 'rgba(255,255,255,0.5)',
  systemUltraThinMaterialLight: 'rgba(255,255,255,0.1)',
  systemThinMaterialLight: 'rgba(255,255,255,0.2)',
  systemMaterialLight: 'rgba(255,255,255,0.3)',
  systemThickMaterialLight: 'rgba(255,255,255,0.4)',
  systemChromeMaterialLight: 'rgba(255,255,255,0.5)',
  systemUltraThinMaterialDark: 'rgba(0,0,0,0.1)',
  systemThinMaterialDark: 'rgba(0,0,0,0.2)',
  systemMaterialDark: 'rgba(0,0,0,0.3)',
  systemThickMaterialDark: 'rgba(0,0,0,0.4)',
  systemChromeMaterialDark: 'rgba(0,0,0,0.5)',
}

export const AbsBlurView = ({ tint, intensity, style, ...props }) => {
  const blurPx = Math.round((intensity / 100) * 25)
  let backgroundColor = tintMap[tint] || tintMap.default

  return (
    <AbsView
      {...props}
      style={{
        width: '100%',
        backgroundColor,
        ...style,
        backdropFilter: `blur(${blurPx}px)`,
        WebkitBackdropFilter: `blur(${blurPx}px)`,
      }}
    />
  )
}
