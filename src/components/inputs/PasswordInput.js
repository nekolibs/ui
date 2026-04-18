import React from 'react'

import { Icon } from '../presentation/Icon'
import { Link } from '../actions/Link'
import { TextInput } from './TextInput'

export function PasswordInput({ hideToggle, suffix, ...props }) {
  const [visible, setVisible] = React.useState(false)

  const toggle = !hideToggle ? (
    <Link onPress={() => setVisible((v) => !v)}>
      <Icon name={visible ? 'RiEyeOffLine' : 'RiEyeLine'} color="text3" />
    </Link>
  ) : null

  return (
    <TextInput
      type={visible ? 'text' : 'password'}
      secureTextEntry={!visible}
      suffix={suffix || toggle}
      {...props}
    />
  )
}
