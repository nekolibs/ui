import React from 'react'

const TabsContext = React.createContext(null)
export const useTabs = () => React.useContext(TabsContext) || {}

export function TabsHandler({ children, items, initialKey }) {
  const [activeKey, setActiveKey] = React.useState(initialKey || items?.[0]?.key)

  const activeTab = React.useMemo(() => {
    return items?.find((item) => item.key === activeKey)
  }, [activeKey])

  const value = { items, onChange: setActiveKey, activeKey, activeTab }

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}
