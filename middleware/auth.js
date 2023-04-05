export default function (context) {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) {
    context.redirect('/auth/login')
  }
  return true
}
