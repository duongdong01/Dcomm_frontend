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
  earseAlbum (listFilesDelete) {
    return axios.delete('/album-file/delete-files-user', { data: listFilesDelete })
  },
  updateUserInfo (data) {
    return axios.put('/users/update-user-info', data).then(_ => _.data)
  },
  getListBlock ({ page, limit, search }) {
    return axios.get(`/user-relationship/get-blocked-user?${page}&${limit}&keyword=${search}`).then(_ => _.data)
  },
  reportPost ({ postId, name, description }) {
    return axios.post('/users/report-post', { postId, name, description })
  },
  payment ({ amount, description }) {
    return axios.post('/paypal/create-payment', { amount, description })
  }
})
