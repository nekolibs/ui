import React from 'react'

import { View } from '../structure'
import { useSteps } from '../steps'

// Native-only deps. require() inside try/catch keeps web bundlers from pulling react-navigation into
// the plain ReactJS build (which uses RoutedStepsContent.js instead).
let NavigationContainer
let NavigationIndependentTree
let StackActions
let createNativeStackNavigator
let available = true
try {
  const nav = require('@react-navigation/native')
  NavigationContainer = nav.NavigationContainer
  NavigationIndependentTree = nav.NavigationIndependentTree
  StackActions = nav.StackActions
  createNativeStackNavigator = require('@react-navigation/native-stack').createNativeStackNavigator
} catch {
  available = false
}

let warned = false

// Renders a step's content exactly like ActiveStepContent — raw, no wrapper. Any scroll/padding is
// the consumer's call inside their own render/renderContent.
const stepContent = (item) => {
  const Content = item.render || item.renderContent || item.Content
  return Content ? <Content /> : null
}

// The swapping content region — the routed equivalent of ActiveStepContent. Drop it inside any
// StepsHandler, alongside whatever fixed chrome you want. It adds NO state of its own: StepsHandler
// stays the single source of truth. This component just renders a self-contained native stack
// (independent from the host NavigationContainer) and keeps it in sync with activeIndex both ways.
export function RoutedStepsContent({ screenOptions, ...props }) {
  const { items, activeIndex, moveToIndex } = useSteps()
  const navRef = React.useRef(null)
  const Stack = React.useRef(available ? createNativeStackNavigator() : null).current

  // StepsHandler -> stack: when activeIndex changes (Next/Back buttons, StepsMenu, custom controls),
  // drive the stack to the matching screen. Compare against the current TOP route (getCurrentRoute)
  // and be explicit about direction: push forward, pop back. Using navigate() here is wrong — it can
  // push a duplicate instead of popping. If the route already matches (e.g. a native gesture back
  // already moved us), this is a no-op.
  React.useEffect(() => {
    const ref = navRef.current
    if (!ref?.isReady?.()) return
    const current = Number(ref.getCurrentRoute?.()?.name) || 0
    if (activeIndex === current) return
    ref.dispatch(
      activeIndex > current ? StackActions.push(String(activeIndex)) : StackActions.popTo(String(activeIndex))
    )
  }, [activeIndex])

  if (!available) {
    if (!warned) {
      warned = true
      console.warn(
        'RoutedStepsContent requires @react-navigation/native and @react-navigation/native-stack; neither is installed.'
      )
    }
    return null
  }

  // stack -> StepsHandler: native gesture / hardware back changes the route without going through
  // moveToIndex. Push that index back into StepsHandler (backward never validates, matching Steps).
  const handleStateChange = () => {
    const index = Number(navRef.current?.getCurrentRoute?.()?.name) || 0
    if (index !== activeIndex) moveToIndex(index)
  }

  const navigator = (
    <Stack.Navigator screenOptions={{ headerShown: false, ...screenOptions }}>
      {items.map((item, index) => (
        <Stack.Screen key={index} name={String(index)} options={{ title: item.label }}>
          {() => stepContent(item)}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  )

  // Self-contained: its own navigation world, independent of the host app's NavigationContainer, so
  // it never touches the host back stack (react-navigation v7+).
  return (
    <View flex {...props}>
      <NavigationIndependentTree>
        <NavigationContainer ref={navRef} onStateChange={handleStateChange}>
          {navigator}
        </NavigationContainer>
      </NavigationIndependentTree>
    </View>
  )
}
