import { AbsTextInput } from '../../abstractions/TextInput'
import { InputWrapper } from './InputWrapper'
import { useColors } from '../../theme/ThemeHandler'

export function TextInput({ value, ...props }) {
  const colors = useColors()

  const STYLE = {
    width: '100%',
    height: '100%',
    borderWidth: 0,
    background: 'transparent',
    outline: 'none',
    color: colors.text,
  }

  return (
    <InputWrapper {...props}>
      <AbsTextInput style={STYLE} placeholderTextColor={colors.text_op30} {...props} value={value} />
    </InputWrapper>
  )
}
