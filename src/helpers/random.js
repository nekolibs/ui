export function genRandonId(length = 30) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}
