import { Divider } from '../../../helpers/Separator'
import { View } from '../../View'

export function DrawerHandle({ hide }) {
  if (!!hide) return false

  return (
    <View center padding="sm">
      <Divider maxWidth={35} line={4} color="text4_op30" height={4} />
    </View>
  )
}
