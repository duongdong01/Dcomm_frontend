export default axios => ({
  getTaskDaily () {
    return axios.get('/task/get-task-daily').then(_ => _.data)
  },
  acceptTaskDaily (taskId) {
    return axios.post('/users/accept-task-daily', { taskId })
  },
  donateToken ({ postId, quantityToken }) {
    return axios.post('/token/donate-token', { postId, quantityToken })
  },
  stakeToken ({ postId, quantityToken }) {
    return axios.post('/token/stake-token', { postId, quantityToken })
  }
})
