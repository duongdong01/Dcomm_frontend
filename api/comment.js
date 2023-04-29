export default axios => ({
  createComment ({ on, content, fileUrl, postId, userMentions }) {
    return axios.post('/comment', { on, content, fileUrl, postId, userMentions })
  },
  getCommentByPostId ({ postId, limit, page }) {
    return axios.get(`/comment/get-comment-by-post-id?page=${page}&limit=${limit}&postId=${postId}`).then(_ => _.data)
  },
  reactionComment ({ on, type, commentId }) {
    return axios.post('/reaction', { on, type, commentId })
  },
  deleteComment (commentId) {
    return axios.delete(`/comment/delete-comment?commentId=${commentId}`)
  }
})
