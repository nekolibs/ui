import { Button } from '../actions'
import { View } from '../structure'
import { useSteps } from './StepsHandler'

export function StepsReturnButton(props) {
  const { activeIndex, moveToPrevStep } = useSteps()
  if (activeIndex === 0) return null

  return <Button label="Back" outline icon="arrow-left-line" onPress={moveToPrevStep} text4 {...props} />
}

export function StepsSubmitButton({ loading: propLoading, ...props }) {
  const { isLastStep, moveToNextStep, loading } = useSteps()
  const label = isLastStep ? 'Submit' : 'Next'
  const icon = isLastStep ? 'checkbox-circle-line' : 'arrow-right-line'

  return (
    <Button
      label={label}
      outline={!isLastStep}
      icon={icon}
      onPress={moveToNextStep}
      loading={propLoading || loading}
      invert
      {...props}
    />
  )
}

export function StepsNavigation({ submitProps, returnProps, ...props }) {
  return (
    <View row centerV toRight {...props} gap="sm">
      <StepsReturnButton {...props} {...returnProps} />
      <StepsSubmitButton {...props} {...submitProps} />
    </View>
  )
}
