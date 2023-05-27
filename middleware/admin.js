export default function (context) {
  const isAdmin = localStorage.getItem('isAdmin')
  if (isAdmin === 'false') {
    alert('Cannot permission.')
    context.redirect('/')
  }
  return true
}
