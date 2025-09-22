import { is } from 'ramda'
import React from 'react'

import { Button } from '../actions'
import { RESULT_TYPES } from '../presentation/Result'
import { Result } from '../presentation'
import { View } from '../structure/View'
import { useModalOpener } from '../structure/modal'

function Footer({ cancelLabel, confirmLabel, onConfirm, type, onClose }) {
  const [loading, setLoading] = React.useState(false)
  const color = RESULT_TYPES[type]?.color || 'primary'

  return (
    <View row gap="sm" centerV>
      <Button sm label={cancelLabel || 'Cancel'} outline color="text_op40" onPress={onClose} flex disabled={loading} />
      <Button
        disabled={loading}
        loading={loading}
        sm
        label={confirmLabel || 'Confirm'}
        color={color}
        onPress={() => {
          setLoading(true)
          Promise.resolve(onConfirm?.())
            .then((result) => {
              if (result !== false) {
                onClose()
              }
            })
            .finally(() => {
              setLoading(false)
            })
        }}
        flex
      />
    </View>
  )
}

export function useConfirmer() {
  const { open } = useModalOpener()

  const confirm = (data, type) => {
    const { width, cancelLabel, confirmLabel, onConfirm, ...resultProps } = data || {}

    open(({ onClose }) => ({
      content: <Result {...resultProps} type={type} padding={0} paddingT="lg" paddingB="sm" />,
      footer: (
        <Footer
          cancelLabel={cancelLabel}
          confirmLabel={confirmLabel}
          onConfirm={onConfirm}
          type={type}
          onClose={onClose}
        />
      ),
      footerProps: { borderT: false },
      width: width || 350,
    }))
  }

  return {
    confirm,
    info: (data) => confirm(data, 'info'),
    error: (data) => confirm(data, 'error'),
    warning: (data) => confirm(data, 'warning'),
    success: (data) => confirm(data, 'success'),
  }
}
