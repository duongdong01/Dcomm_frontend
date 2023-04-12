export default axios => ({
  getMe () {
    return axios.get('/users/me').then(_ => _.data)
  },
  getUserProfile (userId) {
    return axios.get(`/users/profile/${userId}`).then(_ => _.data)
  }
})
