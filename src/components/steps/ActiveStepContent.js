import React from 'react'

import { useSteps } from './StepsHandler'

export function ActiveStepContent() {
  const { activeStep } = useSteps()

  const Content = React.useMemo(
    () => activeStep.render || activeStep.renderContent || activeStep.Content,
    [activeStep.renderContent, activeStep.Content]
  )

  if (!Content) return false

  return <Content />
}
