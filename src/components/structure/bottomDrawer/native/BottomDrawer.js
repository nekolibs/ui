import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler'
import { Modal, Dimensions, StyleSheet, BackHandler, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated'
import React from 'react'

import { DrawerHandle } from './DrawerHandle'
import { DrawerProvider } from './DrawerContext'
import { Pressable } from '../../../actions/Pressable'
import { View } from '../../View'
import { normalizeSnapPoints, findClosestSnapPoint } from './utils'
import { useColors } from '../../../../theme/ThemeHandler'

function InnerContent({
  children,
  render,
  setRender,
  open,
  onClose,
  snapPoints = ['50%'],
  useSafeArea = true,
  enableOverScroll = true,
  enableHandlePanningGesture = true,
  enableContentPanningGesture = true,
  animationConfig = {
    damping: 50,
    stiffness: 500,
    mass: 0.3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
  hideHandle,
  contentProps,
  ...props
}) {
  const { height: SCREEN_HEIGHT } = Dimensions.get('window')
  const insets = useSafeAreaInsets()
  const bottomInset = useSafeArea ? insets.bottom : 0

  const colors = useColors()

  const translateY = useSharedValue(SCREEN_HEIGHT)
  const scrollOffset = useSharedValue(0)
  const scrollEnabled = useSharedValue(false)
  const isScrolling = useSharedValue(false)
  const snapIndex = useSharedValue(0)
  const velocityY = useSharedValue(0)

  const normalizedSnapPoints = React.useMemo(
    () => normalizeSnapPoints(snapPoints, SCREEN_HEIGHT, bottomInset),
    [snapPoints, useSafeArea]
  )
  const maxSnapPoint = React.useMemo(() => Math.max(...normalizedSnapPoints), [normalizedSnapPoints])
  const minSnapPoint = React.useMemo(() => Math.min(...normalizedSnapPoints), [normalizedSnapPoints])

  React.useEffect(() => {
    if (open) {
      const targetY = SCREEN_HEIGHT - normalizedSnapPoints[0]
      translateY.value = withSpring(targetY, animationConfig)
      snapIndex.value = 0
    } else {
      translateY.value = withSpring(SCREEN_HEIGHT, animationConfig, () => {
        scrollOffset.value = 0
        scrollEnabled.value = false
        runOnJS(setRender)(false)
      })
      snapIndex.value = -1
    }
  }, [open])

  React.useEffect(() => {
    if (!onClose || !open || Platform.OS !== 'android') return
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose()
      return true
    })
    return () => backHandler.remove()
  }, [open, onClose])

  useAnimatedReaction(
    () => translateY.value,
    (currentY) => {
      const atMaxSnapPoint = currentY <= SCREEN_HEIGHT - maxSnapPoint
      scrollEnabled.value = atMaxSnapPoint
    },
    []
  )

  let handleClose = React.useCallback(() => {
    onClose?.()
  }, [onClose])
  if (!onClose) handleClose = false

  const snapTo = React.useCallback(
    (index) => {
      'worklet'
      const snapPoint = normalizedSnapPoints[index]
      if (snapPoint !== undefined) {
        translateY.value = withSpring(SCREEN_HEIGHT - snapPoint, animationConfig)
        snapIndex.value = index
      }
    },
    [normalizedSnapPoints]
  )

  // contexto manual para gesto
  const gestureStartTranslateY = useSharedValue(0)

  const panGesture = React.useMemo(() => {
    return Gesture.Pan()
      .enabled(enableHandlePanningGesture || enableContentPanningGesture)
      .onStart(() => {
        gestureStartTranslateY.value = translateY.value
      })
      .onUpdate((event) => {
        const newTranslateY = gestureStartTranslateY.value + event.translationY
        const maxPosition = SCREEN_HEIGHT - maxSnapPoint

        if (enableOverScroll && newTranslateY >= maxPosition) {
          translateY.value = newTranslateY
        } else {
          translateY.value = Math.max(maxPosition, Math.min(SCREEN_HEIGHT, newTranslateY))
        }

        velocityY.value = event.velocityY
      })
      .onEnd(() => {
        const currentPosition = SCREEN_HEIGHT - translateY.value
        const shouldClose =
          !!handleClose &&
          ((velocityY.value > 2000 && currentPosition < minSnapPoint * 0.75) || currentPosition < minSnapPoint * 0.25)

        if (shouldClose) {
          runOnJS(handleClose)()
        } else {
          const closestSnapIndex = findClosestSnapPoint(currentPosition, normalizedSnapPoints, velocityY.value)
          const targetSnapPoint = normalizedSnapPoints[closestSnapIndex]
          translateY.value = withSpring(SCREEN_HEIGHT - targetSnapPoint, animationConfig)
          snapIndex.value = closestSnapIndex
        }
      })
  }, [
    enableHandlePanningGesture,
    enableContentPanningGesture,
    enableOverScroll,
    maxSnapPoint,
    minSnapPoint,
    normalizedSnapPoints,
    animationConfig,
    handleClose,
  ])

  const animatedSheetStyle = useAnimatedStyle(() => {
    const currentHeight = SCREEN_HEIGHT - translateY.value
    return {
      transform: [{ translateY: translateY.value }],
      maxHeight: currentHeight,
    }
  })

  const contextValue = React.useMemo(
    () => ({
      translateY,
      scrollOffset,
      scrollEnabled,
      isScrolling,
      snapIndex,
      maxSnapPoint,
      snapTo,
      animationConfig,
    }),
    [maxSnapPoint]
  )

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Pressable
        absoluteFill
        bg="backdrop_op70"
        onPress={() => {
          if (!handleClose) return
          runOnJS(handleClose)()
        }}
      />

      <DrawerProvider value={contextValue}>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[styles.container, { height: SCREEN_HEIGHT }, animatedSheetStyle]}
            pointerEvents="box-none"
          >
            <View
              flex
              bg="overlayBG"
              shadow
              paddingB={useSafeArea && bottomInset}
              borderRadiusT="xxxl"
              marginL="auto"
              marginR="auto"
              fullW
              {...props}
            >
              <DrawerHandle hide={hideHandle} />
              <View flex {...contentProps}>
                {children}
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </DrawerProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
})

export function BottomDrawer({ open, ...props }) {
  const [render, setRender] = React.useState(open)

  React.useEffect(() => {
    if (open) {
      setRender(true)
    }
  }, [open])

  return (
    <Modal visible={render} transparent statusBarTranslucent navigationBarTranslucent animationType="none">
      <InnerContent {...props} open={open} render={render} setRender={setRender} />
    </Modal>
  )
}
