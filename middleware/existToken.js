export default function (context) {
  const accessToken = localStorage.getItem('access_token')
  const refreshToken = localStorage.getItem('refresh_token')
  if (accessToken && refreshToken) {
    context.redirect('/')
  }
  return true
}
