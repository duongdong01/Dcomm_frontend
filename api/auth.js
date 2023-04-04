export default axios => ({
  forgotPassword ({ email, newPassword, otp }) {
    return axios.post('/auth/forgot-password', { email, newPassword, otp })
  },

  login (email, password) {
    return axios.post('/auth/signin', { email, password }).then(_ => _.data)
  },
  signup (data) {
    return axios.post('/auth/signup', { ...data })
  },
  sentMailOtp ({ email, type }) {
    return axios.post('/auth/send-mail-otp', { email, type })
  },
  verifyOtp (data) {
    return axios.post('/auth/verify-otp', { ...data })
  },
  role () {
    return axios.get('/role')
  },
  refreshToken (token) {
    return axios.get('/auth/refresh-token', token)
  }
})
