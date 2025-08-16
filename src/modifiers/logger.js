export function useLoggerModifier(key) {
  return ([values, props]) => {
    console.log(key, values, props)
    return [values, props]
  }
}
