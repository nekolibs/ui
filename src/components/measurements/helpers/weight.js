const KG_TO_LB = 2.20462
const OZ_PER_LB = 16
const G_PER_KG = 1000

export function kgToLbs(kg) {
  if (!kg) return kg
  return kg * KG_TO_LB
}

export function lbsToKg(lbs) {
  if (!lbs) return lbs
  return lbs / KG_TO_LB
}

export function kgToOz(kg) {
  if (!kg) return kg
  return kg * KG_TO_LB * OZ_PER_LB
}

export function ozToKg(oz) {
  if (!oz) return oz
  return oz / (KG_TO_LB * OZ_PER_LB)
}

export function gToOz(g) {
  if (!g) return g
  return kgToOz(g / G_PER_KG)
}

export function ozToG(oz) {
  if (!oz) return oz
  return ozToKg(oz) * G_PER_KG
}

export function gToLbs(g) {
  if (!g) return g
  return kgToLbs(g / G_PER_KG)
}

export function lbsToG(lbs) {
  if (!lbs) return lbs
  return lbsToKg(lbs) * G_PER_KG
}

export const WEIGHT_CONVERTERS = {
  kg: {
    lbs: { to: kgToLbs, from: lbsToKg },
    oz: { to: kgToOz, from: ozToKg },
  },
  g: {
    oz: { to: gToOz, from: ozToG },
    lbs: { to: gToLbs, from: lbsToG },
  },
}

export const WEIGHT_IMPERIAL_DEFAULTS = { kg: 'lbs', g: 'oz' }
