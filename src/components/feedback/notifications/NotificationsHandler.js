import { is } from 'ramda'
import React from 'react'

import { Notification } from './Notification'
import { SafeAreaView } from '../../structure/SafeAreaView'
import { View } from '../../structure/View'
import { useResponsiveValue } from '../../../responsive/responsiveHooks'

const NotificationsContext = React.createContext(null)

export const useNotifications = () => React.useContext(NotificationsContext) || {}

let idCounter = 0

export function useNotifier() {
  const { add, remove } = useNotifications()
  const notify = (data, opts, type) => {
    const key = ++idCounter
    const time = opts?.time || 6000

    if (is(String, data)) data = { title: data }

    const timerId = setTimeout(() => remove?.(key), time)
    add?.(key, { ...data, type, opts, timerId, time })
  }

  return {
    notify,
    info: (data, opts) => notify(data, opts, 'info'),
    error: (data, opts) => notify(data, opts, 'error'),
    warning: (data, opts) => notify(data, opts, 'warning'),
    success: (data, opts) => notify(data, opts, 'success'),
  }
}

export function NotificationsHandler({ children }) {
  const width = useResponsiveValue({ sm: '100%', df: 400 })
  const [messages, setMessages] = React.useState([])

  const add = React.useCallback((key, data) => {
    setMessages((prev) => [{ key, ...data }, ...prev])
  }, [])

  const remove = React.useCallback((key) => {
    setMessages((prev) => prev.filter((p) => p.key !== key))
  }, [])

  const value = React.useMemo(() => ({ add, remove }), [add, remove])

  return (
    <NotificationsContext.Provider value={value}>
      {children}

      {!!messages.length && (
        <View fixed top={0} right={0} padding="md" width={width} maxWidth="100%" pointerEvents="box-none" zIndex={600}>
          <SafeAreaView gap="xs">
            {messages.map(({ key, ...item }) => (
              <Notification key={key} {...item} />
            ))}
          </SafeAreaView>
        </View>
      )}
    </NotificationsContext.Provider>
  )
}
