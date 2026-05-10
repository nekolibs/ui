import { AbsTextInput } from '../../abstractions/TextInput'
import { InputWrapper } from './InputWrapper'
import { useColors } from '../../theme/ThemeHandler'
import { useSpaces } from '../../theme'

export function TextInput({ onChange, multiline, rows, ...props }) {
  const colors = useColors()
  const spaces = useSpaces()

  const STYLE = {
    width: '100%',
    borderWidth: 0,
    background: 'transparent',
    outline: 'none',
    color: colors.text,
    flex: 1,
    height: '100%',
    ...(multiline ? { paddingTop: spaces.sm, resize: 'none', flex: 1, textAlignVertical: 'top' } : {}),
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
