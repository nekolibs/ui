import tinycolor from 'tinycolor2'

export function AbsActivityIndicator({ size = 20, color, style }) {
  const bg = tinycolor(color).setAlpha(0.2).toString()

  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${size / 8}px solid ${bg}`, // light transparent border
        borderTop: `${size / 8}px solid ${color}`, // colored border for spinner effect
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        ...style,
      }}
    ></div>
  )
}

// Add global CSS for animation
// const styleSheet = document.styleSheets[0]
// styleSheet.insertRule(
// `
// @keyframes spin {
// 0% { transform: rotate(0deg); }
// 100% { transform: rotate(360deg); }
// }
// `,
// styleSheet.cssRules.length
// )
