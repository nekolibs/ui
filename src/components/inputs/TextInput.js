import { AbsTextInput } from '../../abstractions/TextInput'
import { InputWrapper } from './InputWrapper'
import { useColors } from '../../theme/ThemeHandler'

export function TextInput({ onChange, multiline, rows, ...props }) {
  const colors = useColors()

  const STYLE = {
    width: '100%',
    borderWidth: 0,
    background: 'transparent',
    outline: 'none',
    color: colors.text,
    // fontFamily: 'inherit',
    // fontSize: 'inherit',
    // lineHeight: 'inherit',
    ...(multiline ? { resize: 'none' } : { height: '100%' }),
  }

  return (
    <InputWrapper {...props} multiline={multiline}>
      <AbsTextInput
        style={STYLE}
        placeholderTextColor={colors.text_op30}
        {...props}
        multiline={multiline}
        rows={rows}
        onChange={onChange}
      />
    </InputWrapper>
  )
}
