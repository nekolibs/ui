const CM_TO_INCH = 0.393701
const CM_TO_FOOT = 0.0328084
const CM_PER_M = 100
const CM_PER_KM = 100000
const MI_TO_KM = 1.60934

export function cmToIn(cm) {
  if (!cm) return cm
  return cm * CM_TO_INCH
}

export function inToCm(inches) {
  if (!inches) return inches
  return inches / CM_TO_INCH
}

export function cmToFt(cm) {
  if (!cm) return cm
  return cm * CM_TO_FOOT
}

export function ftToCm(feet) {
  if (!feet) return feet
  return feet / CM_TO_FOOT
}

export function cmToFtIn(cm) {
  if (!cm) return false
  const totalInches = cmToIn(cm)
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return { feet, inches }
}

export function ftInToCm(value) {
  if (!value) return false
  const { feet, inches } = value || {}
  const totalInches = feet * 12 + (inches || 0)
  return inToCm(totalInches)
}

export function cmToM(cm) {
  if (!cm) return cm
  return cm / CM_PER_M
}

export function mToCm(m) {
  if (!m) return m
  return m * CM_PER_M
}

export function mToFt(m) {
  if (!m) return m
  return cmToFt(m * CM_PER_M)
}

export function ftToM(ft) {
  if (!ft) return ft
  return ftToCm(ft) / CM_PER_M
}

export function mToFtIn(m) {
  if (!m) return false
  return cmToFtIn(m * CM_PER_M)
}

export function ftInToM(value) {
  if (!value) return false
  return ftInToCm(value) / CM_PER_M
}

export function mToIn(m) {
  if (!m) return m
  return cmToIn(m * CM_PER_M)
}

export function inToM(inches) {
  if (!inches) return inches
  return inToCm(inches) / CM_PER_M
}

export function kmToMi(km) {
  if (!km) return km
  return km / MI_TO_KM
}

export function miToKm(mi) {
  if (!mi) return mi
  return mi * MI_TO_KM
}

export const LENGTH_CONVERTERS = {
  cm: {
    'ft+in': { to: cmToFtIn, from: ftInToCm },
    in: { to: cmToIn, from: inToCm },
    ft: { to: cmToFt, from: ftToCm },
  },
  m: {
    ft: { to: mToFt, from: ftToM },
    'ft+in': { to: mToFtIn, from: ftInToM },
    in: { to: mToIn, from: inToM },
  },
  km: {
    mi: { to: kmToMi, from: miToKm },
  },
}

export const LENGTH_IMPERIAL_DEFAULTS = { cm: 'ft+in', m: 'ft', km: 'mi' }
