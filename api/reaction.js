export default axios => ({
  reactionPost ({ on, type, postId }) {
    return axios.post('/reaction', { on, type, postId })
  }
})
