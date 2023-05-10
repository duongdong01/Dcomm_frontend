export const state = () => ({
  countNotification: 0,
  listNotification: [],
  pageDetail: {}
})

export const getters = {
  countNotification: (state) => {
    return state.countNotification
  },
  listNotification: (state) => {
    return state.listNotification
  },
  pageDetail: (state) => {
    return state.pageDetail
  }
}

export const mutations = {
  setCountNotification: (state, data) => {
    state.countNotification = data
  },
  setListNotification: (state, { isLoadMore, data }) => {
    if (isLoadMore) {
      state.listNotification.push(...data)
    } else {
      state.listNotification = data
    }
  },
  setPageDetail: (state, data) => {
    state.postDetail = data
  },
  deleteNotification: (state, notificationId) => {
    let index = 0
    for (let i = 0; i < state.listNotification.length; i++) {
      if (state.listNotification[i]._id.toString() === notificationId.toString()) {
        index = i
        break
      }
    }
    state.listNotification.splice(index, 1)
  },
  readNotification: (state, notificationId) => {
    let index = 0
    for (let i = 0; i < state.listNotification.length; i++) {
      if (state.listNotification[i]._id.toString() === notificationId.toString()) {
        index = i
        break
      }
    }
    state.listNotification[index].isClicked = true
  }
}

export const actions = {
  async getCountNotification ({ commit, state }) {
    try {
      const data = await this.$api.notification.getCountNotification()
      commit('setCountNotification', data.data.countNotification)
    } catch (err) {
      //
    }
  },
  async getListNotification ({ commit, state }, { limit, page, type, isLoadMore }) {
    try {
      const notiData = await this.$api.notification.getListNotification({ limit, page, type })
      commit('setListNotification', { isLoadMore, data: notiData.data.notification })
      commit('setPageDetail', notiData.data.pageDetail)
    } catch (err) {
      //
    }
  }
}
