import { Card } from '../Card'

export function PopoverContent({ children, placement = 'bottom', ...props }) {
  return (
    <Card
      shadow
      padding="sm"
      br="sm"
      className="neko-popover-content"
      bg="overlayBG"
      border
      {...props}
      borderColor="divider"
    >
      {children}
    </Card>
  )
}
