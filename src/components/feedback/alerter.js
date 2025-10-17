import { is } from 'ramda'

import { Button } from '../actions'
import { Result } from '../presentation'
import { useModalOpener } from '../structure/modal'

export function useAlerter() {
  const { open } = useModalOpener()

  const alert = (data, type) => {
    if (is(String, data)) data = { title: data }
    const { width, closeLabel, hideClose, ...resultProps } = data || {}

    open(({ onClose }) => ({
      content: <Result {...resultProps} type={type} padding={0} paddingT="lg" paddingB="sm" />,
      footer: !hideClose && (
        <Button sm label={closeLabel || 'Close'} outline color="text_op40" onPress={onClose} fullW />
      ),
      footerProps: { borderT: false, paddingV: 'md' },
      width: width || 350,
    }))
  }

  return {
    alert,
    info: (data) => alert(data, 'info'),
    error: (data) => alert(data, 'error'),
    warning: (data) => alert(data, 'warning'),
    success: (data) => alert(data, 'success'),
  }
}
