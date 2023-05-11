export default axios => ({
  getListConverSation ({ page, limit }) {
    return axios.get(`conversation/get-list-conversation?page=${page}&limit=${limit}`).then(_ => _.data)
  },
  getMessageByConversationId ({ conversationId, page, limit }) {
    return axios.get(`/conversation/get-message-by-conversation-id?conversationId=${conversationId}&page=${page}&limit=${limit}`).then(_ => _.data)
  },
  sendMessage (data) {
    return axios.post('/conversation/send-message', data).then(_ => _.data)
  },
  getCountMessage () {
    return axios.get('/conversation/get-count-message').then(_ => _.data)
  },
  getListSticker () {
    return axios.get('/sticker/get-list-sticker').then(_ => _.data)
  },
  createConversation ({ userIds }) {
    return axios.post('/conversation/create-conversation', { userIds })
  }
})
