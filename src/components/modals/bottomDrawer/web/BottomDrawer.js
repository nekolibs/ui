import { Drawer } from '../../drawer'

export const BottomDrawer = ({ snapPoints, contentProps, ...props }) => {
  return <Drawer height={snapPoints?.[0] || 400} contentProps={{ padding: 0, ...contentProps }} {...props} />
}
