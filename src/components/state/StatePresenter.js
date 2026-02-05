import { Loading } from './Loading'
import { Result } from '../presentation'
import { View } from '../structure'

export function StatePresenter({
  loading,
  error,
  empty,
  errorTitle = 'Something went wrong',
  errorDescription,
  emptyTitle = 'No results',
  emptyDescription,
  children,
  ...props
}) {
  if (loading) {
    return (
      <View flex center {...props}>
        <Loading />
      </View>
    )
  }

  if (error) {
    return (
      <View flex center {...props}>
        <Result type="error" title={errorTitle} description={errorDescription || error.message} />
      </View>
    )
  }

  if (empty) {
    return (
      <View flex center {...props}>
        <Result type="empty" title={emptyTitle} description={emptyDescription} />
      </View>
    )
  }

  return children
}
