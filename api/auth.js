export default axios => ({
  forgotPassword (email) {
    return axios.post('/auth/password/forgot', { email })
  },

  login (email, password) {
    return axios.post('/auth/signin', { email, password })
  },

  role () {
    return axios.get('/role')
  }

})
