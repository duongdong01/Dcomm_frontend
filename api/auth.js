export default axios => ({
  forgotPassword (email) {
    return axios.post('/auth/password/forgot', { email })
  },

  login (email, password) {
    return axios.post('/auth/signin', { email, password })
  },
  signup (data) {
    return axios.post('/auth/signup', { ...data })
  },
  sentMailOtp ({ email, type }) {
    return axios.post('/auth/send-mail-otp', { email, type })
  },
  verifyOtp (data) {
    return axios.post('auth/verify-otp', { ...data })
  },
  role () {
    return axios.get('/role')
  }
})
