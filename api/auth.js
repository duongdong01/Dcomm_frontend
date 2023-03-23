export default axios => ({
  forgotPassword (email) {
    return axios.post('/auth/password/forgot', { email })
  },

  login (email, password) {
    return axios.post('/auth/signin', { email, password })
  },
  sentMailOtp ({ email, type }) {
    return axios.post('/auth/send-mail-otp', { email, type })
  },
  role () {
    return axios.get('/role')
  }
})
