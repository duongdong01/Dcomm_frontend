export default axios => ({
  uploadFilesToAws (data) {
    return axios.post('/upload-files/upload', data)
  }
})
