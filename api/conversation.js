export default axios => ({
  getListConverSation ({ page, limit }) {
    return axios.get(`conversation/get-list-conversation?page=${page}&limit=${limit}`).then(_ => _.data)
  },
  getMessageByConversationId ({ conversationId, page, limit }) {
    return axios.get(`/conversation/get-message-by-conversation-id?conversationId=${conversationId}&page=${page}&limit=${limit}`).then(_ => _.data)
  },
  sendMessage (data) {
    return axios.post('/conversation/send-message', data).then(_ => _.data)
  }
})
