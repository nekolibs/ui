import { ThemeHandler } from './theme/ThemeHandler'

export function NekoUI({ children, ...props }) {
  return <ThemeHandler {...props}>{children}</ThemeHandler>
}
