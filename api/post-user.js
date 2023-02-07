export default axios => ({
  create (formData) {
    return axios.post('/user-post', formData)
  },
  getPostById (id) {
    return axios.get(`/user-post/${id}`).then(_ => _.data)
  }
})
