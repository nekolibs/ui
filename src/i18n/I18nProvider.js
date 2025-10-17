import React from 'react'

import { I18n } from './I18n'

const I18nContext = React.createContext()

export function I18nProvider({ children, i18n, config }) {
  const i18nRef = React.useRef(i18n || new I18n(config))
  const [v, setVersion] = React.useState(0)

  const forceUpdate = React.useCallback(() => setVersion((v) => v + 1), [])

  const changeLanguage = React.useCallback(
    (lang) => {
      i18nRef.current.changeLanguage(lang)
      forceUpdate()
    },
    [forceUpdate]
  )

  const value = React.useMemo(
    () => ({
      t: (...args) => i18nRef.current.t(...args),
      i18n: i18nRef.current,
      v,
      language: i18nRef.current.language,
      changeLanguage,
    }),
    [v, forceUpdate, changeLanguage]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useTranslation(namespace) {
  const ctx = React.useContext(I18nContext)
  if (!ctx) throw new Error('useTranslation must be used inside <I18nProvider>')
  const t = (key, opts = {}) => ctx?.t?.(key, { ns: namespace, ...opts })
  return { ...ctx, t }
}
