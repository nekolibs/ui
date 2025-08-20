import { AbsTextInput } from '../../abstractions/TextInput'
import { InputWrapper } from './InputWrapper'
import { useColors } from '../../theme/ThemeHandler'

export function TextInput({ value, onChange, ...props }) {
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
      <AbsTextInput value={value} onChange={onChange} style={STYLE} {...props} />
    </InputWrapper>
  )
}
