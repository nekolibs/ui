import React from 'react'

import { capitalizeFirstLetter, toCamelCase } from '../helpers/string'

export function AbsIcon({ name, ...props }) {
  const [loading, setLoading] = React.useState(true)
  const ref = React.useRef()
  const Component = ref?.current || (() => false)

  React.useEffect(() => {
    try {
      import('@remixicon/react').then((module) => {
        if (!!name && !name.startsWith('Ri')) name = 'Ri' + capitalizeFirstLetter(toCamelCase(name))
        let IconComponent = module[name] || module['RiCircleFill']
        ref.current = IconComponent
        setLoading(false)
      })
    } catch {
      console.error('Error loading AbsIcon component')
    }
  }, [])

  if (loading) {
    return (
      <div
        style={{
          height: props.size,
          width: props.size,
          borderRadius: props.size,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            height: props.size / 3,
            width: props.size / 3,
            borderRadius: props.size,
            backgroundColor: props.color,
          }}
        />
      </div>
    )
  }

  return <Component {...props} />
}
