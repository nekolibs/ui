import { Link } from './Link'

export function ClearLink({ hide, value, onChange, ...props }) {
  if (!!hide || !!value) return false
  return <Link center red label="Remove Value" onPress={() => onChange(null)} padding="sm" {...props} />
}
