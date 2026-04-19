import React from 'react'

const StepsContext = React.createContext(null)
export const useSteps = () => React.useContext(StepsContext) || {}

export function StepsHandler({ children, items, onSubmit, onValidateStep, onStepChange, resetMaxIndexOnNavigate }) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [maxIndexReleased, setMaxIndexReleased] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const activeStep = items[activeIndex]
  const isLastStep = activeIndex === items.length - 1

  const moveToIndex = async (index) => {
    const shouldValidate = index > activeIndex
    if (shouldValidate) {
      setLoading(true)
      try {
        let result = await Promise.resolve(onValidateStep?.())
        if (result === false) return
        result = await Promise.resolve(activeStep?.onValidate?.())
        if (result === false) return
      } catch {
        return
      } finally {
        setLoading(false)
      }
      await Promise.resolve(onStepChange?.())
    }

    if (index === items.length) onSubmit?.()
    const nextStep = items[index]
    if (!nextStep) return
    setActiveIndex(index)
    if (index > maxIndexReleased || !!resetMaxIndexOnNavigate) setMaxIndexReleased(index)
  }

  const moveToNextStep = () => moveToIndex(activeIndex + 1)
  const moveToPrevStep = () => moveToIndex(activeIndex - 1)

  const value = {
    items,
    moveToIndex,
    activeIndex,
    activeStep,
    maxIndexReleased,
    loading,
    isLastStep,
    moveToNextStep,
    moveToPrevStep,
  }

  return <StepsContext.Provider value={value}>{children}</StepsContext.Provider>
}
