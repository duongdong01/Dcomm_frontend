export default axios => ({
  createPost (data) {
    return axios.post('/post/create-normal-post', data).then(_ => _.data)
  }
})
