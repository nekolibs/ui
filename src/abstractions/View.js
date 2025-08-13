import React from 'react'

let AbsView

try {
  const { Platform, View: RNView } = require('react-native')
  console.log('NATIVE')
  AbsView = (props) => <RNView {...props} />
} catch {
  console.log('WEB')
  AbsView = (props) => <div {...props} />
}

export { AbsView }
