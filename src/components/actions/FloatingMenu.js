import { Icon } from '../presentation'
import { Link } from './Link'
import { Text } from '../text'
import { View } from '../structure'
import { moveScale } from '../../theme/helpers/sizeScale'
import { useSafeAreaInsets } from '../../abstractions/helpers/useSafeAreaInsets'

export function FloatingMenu({ fixed, onChange, items, activeIndex, size = 'md', WrapperView, ...props }) {
  const insets = useSafeAreaInsets()
  const height = moveScale(size, 2)

  const bg = !WrapperView ? 'overlayBG' : null
  WrapperView = WrapperView || View

  return (
    <View absolute={!fixed} fixed={fixed} left="md" right="md" centerH bottom={Math.max(insets.bottom, 16)}>
      <WrapperView height={height} shadow round row paddingH="sm" bg={bg} {...props}>
        {items.map((item, index) => {
          const isActive = index === activeIndex

          return (
            <Link key={index} onPress={() => onChange(item, index)} center padding="xs" gap={3} width={height} round>
              <Icon
                name={isActive ? item.icon?.replace(/line(?=[^line]*$)/, 'fill') : item.icon}
                size={height}
                color={isActive ? 'primary' : 'text3'}
              />
              {!!item.label && (
                <Text size="xxs" center color={isActive ? 'primary' : 'text3'} strong>
                  {item.label}
                </Text>
              )}
            </Link>
          )
        })}
      </WrapperView>
    </View>
  )
}
