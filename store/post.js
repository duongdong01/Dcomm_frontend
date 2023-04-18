export const state = () => ({
  feeds: [],
  pageDetail: {}
})

export const getters = {
  feeds: (state) => {
    return state.feeds
  },
  pageDetail: (state) => {
    return state.pageDetail
  }
}
export const mutations = {
  setFeeds: (state, { isLoadMore, data }) => {
    if (isLoadMore) {
      state.feeds.push(...data)
    } else {
      state.feeds = data
    }
  },
  setPageDetail: (state, data) => {
    state.pageDetail = data
  },
  newPost: (state, data) => {
    state.feeds.unshift(data)
  },
  toggleLikePost: (state, postId) => {
    console.log('liked')
    state.feeds.forEach((el) => {
      if (el._id.toString() === postId.toString()) {
        if (el.isReactions) {
          if (el.countReaction > 0) {
            el.isReactions = false
            el.countReaction -= 1
          }
        } else {
          el.isReactions = true
          el.countReaction += 1
        }
      }
    })
  }
}
export const actions = {
  async getPostFeeds ({ commit, state }, { limit, page, isLoadMore }) {
    try {
      const feedData = await this.$api.post.getPostFeeds({ limit, page })
      console.log(feedData)
      commit('setFeeds', { isLoadMore, data: feedData.data.posts })
      commit('setPageDetail', feedData.data.pageDetail)
      console.log(state.feeds.length)
    } catch (err) {
      //
    }
  }
}
