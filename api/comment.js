export default axios => ({
  createComment ({ on, content, fileUrl, postId, userMentions }) {
    return axios.post('/comment', { on, content, fileUrl, postId, userMentions })
  }
})
