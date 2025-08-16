export function FormWrapperComponent({ children, form, ...props }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    form.handleSubmit()
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}
