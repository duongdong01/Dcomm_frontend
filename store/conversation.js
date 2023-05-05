export const state = () => ({
  listConversation: [],
  pageDetail: {},
  listMessage: [],
  pageDetailListMessage: {},
  userReceiverMessage: {},
  listUserOnline: [],
  countMessageOutSide: 0
})
export const getters = {
  listConversation: (state) => {
    return state.listConversation
  },
  countMessageOutSide: (state) => {
    return state.countMessageOutSide
  },
  pageDetail: (state) => {
    return state.pageDetail
  },
  listMessage: (state) => {
    return state.listMessage
  },
  pageDetailListMessage: (state) => {
    return state.pageDetailListMessage
  },
  userReceiverMessage: (state) => {
    return state.userReceiverMessage
  },
  listUserOnline: (state) => {
    return state.listUserOnline
  }
}

export const mutations = {
  setCountMessageOutSide: (state, data) => {
    state.countMessageOutSide = data
  },
  setListUserOnline: (state, data) => {
    state.listUserOnline = data
  },
  setUserReceiverMessage: (state, data) => {
    state.userReceiverMessage = data
  },
  setPageDetail: (state, data) => {
    state.postDetail = data
  },
  setListConversation: (state, { isLoadMore, data }) => {
    if (isLoadMore) {
      state.listConversation.unshift(...data)
    } else {
      state.listConversation = data
    }
  },
  setPageDetailListMessage: (state, data) => {
    state.pageDetailListMessage = data
  },
  setListMessage: (state, { isLoadMore, data }) => {
    if (isLoadMore) {
      state.listMessage.unshift(...data)
    } else {
      state.listMessage = data
    }
  },
  setNewMessage: (state, data) => {
    state.listMessage.push(data)
  }
}
export const actions = {
  async getListConversation ({ commit, state }, { limit, page, isLoadMore }) {
    try {
      const conversationData = await this.$api.conversation.getListConverSation({ limit, page })
      commit('setListConversation', { isLoadMore, data: conversationData.data.listConversation })
      commit('setPageDetail', conversationData.data.pageDetail)
    } catch (err) {
      //
    }
  },
  async getListMessage ({ commit, state }, { limit, page, isLoadMore, conversationId }) {
    try {
      const messageData = await this.$api.conversation.getMessageByConversationId({ limit, page, conversationId })
      commit('setListMessage', { isLoadMore, data: messageData.data.messages })
      commit('setPageDetailListMessage', messageData.data.pageDetail)
      commit('setUserReceiverMessage', messageData.data.userReceiverMessage)
    } catch (err) {
      //
    }
  },
  async getCountMessage ({ commit, state }) {
    try {
      const countMessageData = await this.$api.conversation.getCountMessage()
      commit('setCountMessageOutSide', countMessageData.data.countMessage)
    } catch (err) {
      //
    }
  }
}
