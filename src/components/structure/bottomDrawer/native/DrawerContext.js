import React from 'react';

const DrawerContext = React.createContext(null);

export function DrawerProvider({ children, value }) {
  return (
    <DrawerContext.Provider value={value}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawerContext() {
  const context = React.useContext(DrawerContext);

  if (!context) {
    throw new Error('useDrawerContext must be used within a DrawerProvider');
  }

  return context;
}