export function debounce(action, time = 550) {
  let timer
  return (...params) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      action.apply(this, params)
    }, time)
  }
}
