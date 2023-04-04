export default axios => ({
  getMe () {
    console.log('Ok')
    return axios.get('/users/me').then(_ => _.data)
  },
  getUserProfile (userId) {
    console.log('oook')
    return axios.get(`/users/profile/${userId}`).then(_ => _.data)
  }
})
