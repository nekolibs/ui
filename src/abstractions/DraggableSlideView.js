export function AbsDraggableSlideView({ children }) {
  return children
}
// export function AbsDraggableSlideView({
// from = 'left',
// distance,
// open,
// onClose,
// style,
// threshold = 0.3,
// children,
// resetOnOpen = true,
// }) {
// const [dragging, setDragging] = React.useState(false)
// const [startPos, setStartPos] = React.useState(0)
// const [translate, setTranslate] = React.useState(0)

// const ref = React.useRef()

// Reset on open
// React.useEffect(() => {
// if (resetOnOpen && open) setTranslate(0)
// }, [open, resetOnOpen])

// Handle pointer down
// const handlePointerDown = (e) => {
// setDragging(true)
// const pos = from === 'left' || from === 'right' ? e.clientX : e.clientY
// setStartPos(pos)
// e.target.setPointerCapture(e.pointerId)
// }

// const handlePointerMove = (e) => {
// if (!dragging) return
// const pos = from === 'left' || from === 'right' ? e.clientX : e.clientY
// let delta = pos - startPos

// if (from === 'left') delta = Math.min(delta, 0)
// else if (from === 'right') delta = Math.max(delta, 0)
// else if (from === 'top') delta = Math.min(delta, 0)
// else delta = Math.max(delta, 0)

// setTranslate(delta)
// }

// const handlePointerUp = (e) => {
// if (!dragging) return
// setDragging(false)

// Determine progress and if should close
// const size = from === 'left' || from === 'right' ? window.innerWidth : window.innerHeight
// const delta = translate
// let progress
// if (from === 'left') progress = -delta / (distance || size)
// else if (from === 'right') progress = delta / (distance || size)
// else if (from === 'top') progress = -delta / (distance || size)
// else progress = delta / (distance || size)

// const shouldClose = progress > threshold

// Animate to final position
// const finalValue = shouldClose ? (from === 'left' || from === 'top' ? -(distance || size) : distance || size) : 0

// setTranslate(finalValue)

// if (shouldClose && onClose) onClose()
// }

// const transformStyle =
// from === 'left' || from === 'right'
// ? { transform: `translateX(${translate}px)`, transition: dragging ? 'none' : 'transform 0.2s' }
// : { transform: `translateY(${translate}px)`, transition: dragging ? 'none' : 'transform 0.2s' }

// return (
// <div
// ref={ref}
// style={{ ...style, ...transformStyle, touchAction: 'none', cursor: 'grab' }}
// onPointerDown={handlePointerDown}
// onPointerMove={handlePointerMove}
// onPointerUp={handlePointerUp}
// >
// {children}
// </div>
// )
// }
