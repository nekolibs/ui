import { TextInput } from 'react-native'

export function AbsTextInput({ onChange, align, textAlign, ...props }) {
  return <TextInput onChangeText={onChange} textAlign={textAlign || align} {...props} />
}
