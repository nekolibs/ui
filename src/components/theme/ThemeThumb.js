import { View } from '../structure'
import { useFormattedTheme } from '../../theme/format/formatTheme'
import { useResponsiveValue } from '../../responsive'
import { useThemeHandler } from '../../theme'

export function ThemeThumb({ value }) {
  const { themes } = useThemeHandler()
  const { colors, label } = useFormattedTheme(themes, value)
  const isMobile = useResponsiveValue({ smd: true, df: false })

  if (isMobile) {
    return (
      <View centerH>
        <View
          bg={colors.mainBG}
          height={175}
          fullW
          br="md"
          hiddenOverflow
          border={2}
          brColor={colors.divider}
          maxWidth={100}
        >
          <View bg={colors.overlayBG} height={25} padding={8} row borderB brColor={colors.divider}>
            <View width={25} fullH bg={colors.primary} br="xxs" />
            <View flex />
            <View ratio={1} fullH bg={colors.divider} round />
          </View>

          <View flex padding={6}>
            <View br="md" bg={colors.overlayBG} flex gap={8} padding={8} border brColor={colors.divider}>
              <View bg={colors.text2} height={4} br="xxs" />
              <View bg={colors.text4} height={2} br="xxs" />
              <View bg={colors.text4} height={2} br="xxs" />
              <View bg={colors.text4} height={2} br="xxs" />
              <View bg={colors.text4} height={2} br="xxs" />
              <View bg={colors.text4} height={2} br="xxs" />

              <View flex />

              <View height={6} fullW bg={colors.primary} br="xxs" />
            </View>
          </View>

          <View
            bg={colors.overlayBG}
            height={25}
            padding={8}
            row
            borderT
            brColor={colors.divider}
            justify="space-around"
            centerV
          >
            <View ratio={1} fullH bg={colors.divider} round />
            <View ratio={1} fullH bg={colors.divider} round />
            <View ratio={1} fullH bg={colors.divider} round />
            <View ratio={1} fullH bg={colors.divider} round />
            <View ratio={1} fullH bg={colors.divider} round />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View bg={colors.mainBG} height={175} fullW br="md" hiddenOverflow border={2} brColor={colors.divider}>
      <View bg={colors.overlayBG} height={25} paddingV={8} paddingH={12} row borderB brColor={colors.divider}>
        <View width={25} bg={colors.primary} br="xxs" />
        <View flex />
        <View ratio={1} fullH bg={colors.text4} round />
      </View>

      <View row padding={12} paddingT={8} gap={6} flex>
        <View br="xs" bg={colors.overlayBG} flex gap={6} padding={7} border brColor={colors.divider}>
          <View bg={colors.text4} height={2} br="xxs" />
          <View bg={colors.text4} height={2} br="xxs" />
          <View bg={colors.text4} height={2} br="xxs" />
          <View bg={colors.text4} height={2} br="xxs" />
          <View bg={colors.text4} height={2} br="xxs" />
        </View>
        <View br="xs" bg={colors.overlayBG} flex={4} gap={8} padding={7} border brColor={colors.divider}>
          <View bg={colors.text2} height={4} br="xxs" width={30} />
          <View bg={colors.text4} height={2} br="xxs" width={'80%'} />
          <View bg={colors.text4} height={2} br="xxs" width={'80%'} />
          <View bg={colors.text4} height={2} br="xxs" width={'80%'} />
          <View bg={colors.text4} height={2} br="xxs" width={'80%'} />
          <View bg={colors.text4} height={2} br="xxs" width={'80%'} />
          <View flex />
          <View row toRight gap={6}>
            <View width={25} height={8} bg={colors.text4} br="xxs" />
            <View width={25} height={8} bg={colors.primary} br="xxs" />
          </View>
        </View>
      </View>
    </View>
  )
}
