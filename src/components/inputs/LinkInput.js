import { InputWrapper } from './InputWrapper'
import { Link } from '../actions/Link'
import { Text } from '../text/Text'
import { View } from '../structure/View'
import { useColors } from '../../theme/ThemeHandler'

export function LinkInput({ ref, onPress, onClick, placeholder, value, disabled, ...props }) {
  return (
    <Link ref={ref} onPress={!props.loading ? onPress || onClick : undefined} flex fullW centerV disabled={disabled}>
      <InputWrapper {...props}>
        <View centerV flex fullW>
          <Text color={!!value ? 'text' : 'text_op30'} label={value || placeholder} numberOfLines={1} />
        </View>
      </InputWrapper>
    </Link>
  )
}
