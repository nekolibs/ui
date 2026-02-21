import { FlatList, ScrollView } from '../../../list'
import { createDrawerScrollComponent } from './createDrawerScrollComponent'

export const DrawerScrollView = createDrawerScrollComponent(ScrollView)
export const DrawerFlatList = createDrawerScrollComponent(FlatList)
