import { pickBy } from 'ramda'

export const clearProps = pickBy((item) => item !== undefined)
