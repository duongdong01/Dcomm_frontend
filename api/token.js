export default axios => ({
  getTaskDaily () {
    return axios.get('/task/get-task-daily').then(_ => _.data)
  },
  acceptTaskDaily (taskId) {
    return axios.post('/users/accept-task-daily', { taskId })
  }
})
