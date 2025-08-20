import { TextInput } from 'react-native'

export function AbsTextInput({ onChange, ...props }) {
  return <TextInput onChangeText={onChange} {...props} />
}
