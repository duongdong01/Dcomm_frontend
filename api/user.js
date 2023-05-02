export default axios => ({
  getMe () {
    return axios.get('/users/me').then(_ => _.data)
  },
  getUserProfile (userId) {
    return axios.get(`/users/profile/${userId}`).then(_ => _.data)
  },
  getListMedias ({ userId, page, limit }) {
    return axios.get(`album-file/get-all-media-by-user/${userId}?page=${page}&limit=${limit}`).then(_ => _.data)
  },
  updateUserInfo (data) {
    return axios.put('/users/update-user-info', data).then(_ => _.data)
  }
})
