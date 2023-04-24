export default axios => ({
  createPost (data) {
    return axios.post('/post/create-normal-post', data).then(_ => _.data)
  },
  getPostFeeds ({ limit = 10, page = 1 }) {
    return axios.get(`/post/get-posts-in-user-feed?page=${page}&limit=${limit}`).then(_ => _.data)
  },
  deletePostById (postId) {
    return axios.delete('/post/delete-post-by-id', { data: { postId } })
  },
  createSharePost (data) {
    return axios.post('/post/create-share-post', data).then(_ => _.data)
  }
})
