# @neko-os/ui Library

A cross-platform UI library for React (web) and React Native (mobile) with a modifier-based styling system.

## Core Concepts

### Modifiers

Modifiers are the foundation of this library. They are props that translate to styles, automatically resolving theme values.

```jsx
// Modifiers replace inline styles
<View padding="md" bg="overlayBG" br="lg" center>
  <Text h3 color="primary">Hello</Text>
</View>
```

### How Components Use Modifiers

Components pipe props through modifier hooks using ramda's `pipe`:

```jsx
// src/components/structure/View.js
import { pipe } from 'ramda'

export function View({ children, ...rootProps }) {
  const [_, props] = pipe(
    useThemeComponentModifier('View'),
    useFlexWrapperModifier,
    useDisplayModifier,
    useSizeModifier,
    usePositionModifier,
    useOverflowModifier,
    usePaddingModifier,
    useMarginModifier,
    useFlexModifier,
    useBackgroundModifier,
    useBorderModifier,
    useShadowModifier
  )([{}, rootProps])

  return <AbsView {...props}>{children}</AbsView>
}
```

Each modifier hook:
1. Receives `[values, props]` tuple
2. Extracts relevant props
3. Converts them to styles using theme values
4. Returns `[values, { ...restProps, style: { ...style } }]`

## File Structure

```
src/
├── abstractions/          # Platform-specific implementations
│   ├── View.js           # Web implementation
│   ├── View.native.js    # React Native implementation
│   └── helpers/
│       ├── storage.js
│       └── storage.native.js
├── components/
│   ├── structure/        # View, Card, Modal, Drawer, TopBar, etc.
│   ├── actions/          # Button, Link, Menu, FloatingMenu, etc.
│   ├── inputs/           # TextInput, Checkbox, Select, etc.
│   ├── presentation/     # Icon, Avatar, Badge, Tag, etc.
│   ├── text/             # Text component
│   ├── list/             # ScrollView, FlatList
│   ├── state/            # Loading, StatePresenter
│   ├── theme/            # ThemePicker, ThemeStatusBar
│   ├── animations/       # AnimatedView, AnimatedTopBar, ParallaxHeader
│   └── helpers/          # Responsive, LazyRender, etc.
├── modifiers/            # All modifier hooks
├── theme/                # Theme system
├── responsive/           # Responsive system
└── helpers/              # Utilities (Storage, etc.)
```

## Modifiers Reference

### src/modifiers/padding.js
```jsx
padding, paddingH, paddingV, paddingT, paddingB, paddingL, paddingR
// Uses theme.spaces: xxxs, xxs, xs, sm, md, lg, xl, xxl, xxxl
```

### src/modifiers/margin.js
```jsx
margin, marginH, marginV, marginT, marginB, marginL, marginR
// Uses theme.spaces
```

### src/modifiers/size.js
```jsx
width, height           // Direct values or theme.elementHeights
minW, maxW, minH, maxH  // Constraints
fullW, fullH            // 100% width/height
ratio                   // Aspect ratio
square                  // ratio={1}
span                    // 24-column grid (span={12} = 50%)
```

### src/modifiers/flexWrapper.js
```jsx
row                     // flexDirection: row (default: column)
center                  // Center both axes
centerV, centerH        // Center single axis
toRight, toLeft         // Horizontal alignment
toTop, toBottom         // Vertical alignment
gap                     // Gap between children (uses theme.spaces)
wrap                    // flexWrap: wrap
justify, align          // Raw flexbox props
```

### src/modifiers/flex.js
```jsx
flex                    // flex={true} becomes flex: 1
flex={2}                // Proportional flex
```

### src/modifiers/background.js
```jsx
bg="primary"            // Theme color
bg="#FF0000"            // Custom color
bg={['red', 'blue']}    // Gradient (web: linear-gradient)
colors={[...]}          // Alternative gradient syntax
angle={45}              // Gradient angle
```

### src/modifiers/border.js
```jsx
br="md"                 // Border radius (uses theme.radius)
brT, brB, brL, brR      // Directional radius
round                   // br={1000} (pill shape)
border                  // 1px border
border={2}              // Custom width
borderT, borderB, etc.  // Directional borders
borderColor, brColor    // Border color (default: divider)
```

### src/modifiers/position.js
```jsx
absolute, relative      // Position type
fixed, sticky           // Web only (becomes absolute on mobile)
absoluteFill            // absolute + top/right/bottom/left = 0
fixedFill               // fixed + fill
top, bottom, left, right // Position values (uses theme.spaces)
zIndex                  // Default 10 for absolute
```

### src/modifiers/shadow.js
```jsx
shadow                  // Uses theme shadow color
shadow="primary"        // Custom shadow color
// Outputs boxShadow (web) and shadowColor/elevation (native)
```

### src/modifiers/overflow.js
```jsx
hiddenOverflow          // overflow: hidden
scroll                  // overflow: scroll
scrollY, scrollX        // Single axis scroll
noScroll                // Disable scroll
```

### src/modifiers/text.js
```jsx
// Text presets (from theme.texts)
h1, h2, h3, h4, h5, h6, p, sm, xs, xxs

// Styles
bold, strong            // fontWeight: 600
italic                  // fontStyle: italic
underline               // textDecorationLine: underline
center                  // textAlign: center
toRight                 // textAlign: right
```

## Theme System

### src/theme/ThemeHandler.js

Provides theme context and hooks:

```jsx
// Provider
<ThemeHandler themes={themes} initTheme="light">
  {children}
</ThemeHandler>

// Hooks
useTheme()              // Full theme object
useTheme('colors')      // Specific group
useColors()             // Shorthand for colors
useSpaces()             // Shorthand for spaces
useThemeHandler()       // { activeThemeKey, onChangeTheme, toggleTheme, ... }
```

### src/theme/default/base.js

Base scales shared by all themes:

```js
{
  spaces: { xxxs: 1, xxs: 3, xs: 5, sm: 10, md: 15, lg: 20, xl: 30, xxl: 40, xxxl: 50 },
  radius: { xxxs: 4, xxs: 5, xs: 5, sm: 7, md: 8, lg: 10, xl: 12, xxl: 15, xxxl: 18 },
  elementHeights: { xxxs: 10, xxs: 15, xs: 25, sm: 35, md: 40, lg: 45, xl: 50, xxl: 60, xxxl: 70 },
  texts: { h1: { fontSize: 35, strong: true }, ... }
}
```

### src/theme/default/lightTheme.js

```js
{
  label: 'Light',
  colors: {
    primary: '#818DF9',
    text: '#272D34',
    text2: '#4A5159',
    text3: '#6E7680',
    text4: '#9AA1AC',
    mainBG: '#F4F5FE',
    overlayBG: '#FFFFFF',
    backdrop: '#383E44',
    shadow: 'rgba(39, 45, 52, 0.15)',
    transparent: 'rgba(255, 255, 255, 0)',
    divider: '#e0e0e0',
    blue: '#4DA3FF',
    yellow: '#FFD93B',
    green: '#4CAF50',
    purple: '#9B59B6',
    orange: '#FF7F50',
    cyan: '#00BCD4',
    red: '#E74C3C',
    navy: '#34495E',
    indigo: '#5C6BC0',
    gray: '#B0BEC5',
    brown: '#8D6E63',
    lylac: '#B39DDB',
    pink: '#F48FB1',
  }
}
```

### src/theme/format/formatTheme.js

Automatically:
1. Merges theme with base theme using `base` property
2. Generates color variants via `applyColorVariantsOnTheme`
3. Applies `_all` global overrides
4. Calculates `isDark` from overlayBG brightness

### src/theme/format/colorsVariations.js

Auto-generates color variants:
```jsx
primary-10, primary-20, ... primary-60  // Lighter
primary+10, primary+20, ... primary+60  // Darker
primary_op10, primary_op20, ... primary_op90  // Opacity
```

Direction (+/-) adapts based on theme darkness for consistent results.

## Responsive System

### src/responsive/ResponsiveHandler.js

Provides responsive context:
```jsx
const { width, screen } = useResponsive()
// width: window width in pixels
// screen: current breakpoint name (sm, md, lg, xl)
```

Default breakpoints:
```js
[
  { name: 'sm', value: 768 },
  { name: 'md', value: 1024 },
  { name: 'lg', value: 1440 },
  { name: 'xl', value: 10000 },
]
```

### src/responsive/responsiveHooks.js

```jsx
// Get value for current breakpoint
const value = useResponsiveValue({
  sm: 'small',
  md: 'medium',
  lg: 'large',
  df: 'default',  // Fallback
})

// Up/Down modifiers
smu: 'value'  // sm and up (>= 0)
mdd: 'value'  // md and down (< 1024)

// Platform-specific
native: 'value'  // iOS/Android
web: 'value'     // Browser
```

### src/components/helpers/Responsive.js

```jsx
<ResponsiveRender sm={() => <A />} md={() => <B />} />
<ShowOn mdu={true}><DesktopOnly /></ShowOn>
<HideOn smd={true}><HiddenOnMobile /></HideOn>
```

## Storage

### src/helpers/storage.js

Cross-platform storage with auto JSON serialization:

```jsx
Storage.set('key', value)        // Sync set
Storage.get('key')               // Sync get
Storage.remove('key')            // Sync remove
Storage.setAsync('key', value)   // Async set
Storage.getAsync('key')          // Async get
Storage.useState('key', default) // React hook with persistence
```

Web uses localStorage, mobile uses expo-sqlite/kv-store.

## Animations (Mobile)

### src/components/animations/ReanimatedScrollHandler.native.js

Provides scroll context for scroll-based animations:

```jsx
<ReanimatedScrollHandler>
  <AnimatedTopBar ... />
  <ContentWithAnimatedFlatList />
</ReanimatedScrollHandler>

// In content:
const { scrollY, scrollHandler } = useReanimatedScroll()
<Animated.FlatList onScroll={scrollHandler} scrollEventThrottle={16} />
```

### src/components/animations/AnimatedTopBar.native.js

TopBar that appears/hides based on scroll:

```jsx
<AnimatedTopBar
  title="Title"
  showAfter={90}      // Scroll position to start showing
  animationRange={30} // Animation duration in scroll pixels
  fade                // Fade in
  slide               // Slide down
/>
```

### src/components/animations/ParallaxHeader.native.js

Parallax header with scale on pull-down:

```jsx
<ParallaxHeader
  height={250}
  parallaxSpeed={0.5}    // 0-1, how fast content moves
  disableResistence      // Disable rubber band effect
>
  <ImageBackground ... />
</ParallaxHeader>
```

## Platform Abstractions

The library supports three platforms with different file extensions:

- `.js` (no suffix) - Default for all platforms, or specifically for regular React apps (Vite, Next.js, CRA)
- `.web.js` - React Native Web specific
- `.native.js` - React Native specific (Android/iOS)

When a platform-specific file exists, it takes priority. Otherwise, the `.js` file is used as fallback.

Example:
```
src/abstractions/
├── View.js           # Used by regular React, and as fallback
├── View.web.js       # React Native Web (overrides .js)
└── View.native.js    # React Native iOS/Android (overrides .js)
```

This allows platform-specific implementations while keeping component logic shared.

## Creating New Components

1. Create component file in appropriate category folder
2. Import and pipe relevant modifiers
3. Use `Abs*` abstractions for platform elements
4. Export from category index and main index

```jsx
import { pipe } from 'ramda'
import { AbsView } from '../../abstractions/View'
import { usePaddingModifier } from '../../modifiers/padding'
import { useBackgroundModifier } from '../../modifiers/background'
// ... other modifiers

export function MyComponent({ children, ...rootProps }) {
  const [values, props] = pipe(
    usePaddingModifier,
    useBackgroundModifier,
    // ... other modifiers
  )([{}, rootProps])

  return <AbsView {...props}>{children}</AbsView>
}
```

## Creating New Modifiers

1. Create hook in `src/modifiers/`
2. Follow pattern: receive `[values, props]`, return `[values, { ...restProps, style }]`
3. Use theme hooks to resolve values
4. Add to component pipes as needed

```jsx
import { clearProps } from './_helpers'
import { useGetSpace } from '../theme/ThemeHandler'

export function useMyModifier([values, props]) {
  const getSpace = useGetSpace()
  const { myProp, ...restProps } = props

  const myStyle = getSpace(myProp)

  const style = clearProps({ someCSS: myStyle })

  return [
    values,
    {
      ...restProps,
      style: { ...props.style, ...style },
    },
  ]
}
```
