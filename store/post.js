export const state = () => ({
  feeds: [],
  pageDetail: {},
  isOpenModalSharePost: false
})

export const getters = {
  feeds: (state) => {
    return state.feeds
  },
  pageDetail: (state) => {
    return state.pageDetail
  },
  isOpenModalSharePost: (state) => {
    return state.isOpenModalSharePost
  }
}
export const mutations = {
  setSharePostModal: (state, show) => {
    state.isOpenModalSharePost = show
  },
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
  deletePost: (state, postId) => {
    let count = 0
    for (let i = 0; i < state.feeds.length; i++) {
      if (state.feeds[i]._id.toString() === postId.toString()) {
        count = i
        break
      }
    }
    state.feeds.splice(count, 1)
    console.log(state.feeds, count, count + 1)
  },
  toggleLikePost: (state, postId) => {
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
  },
  commentPost: (state, postId) => {
    state.feeds.forEach((el) => {
      if (el._id.toString() === postId.toString()) {
        el.countComment += 1
      }
    })
  }
}
export const actions = {
  async getPostFeeds ({ commit, state }, { limit, page, isLoadMore }) {
    try {
      const feedData = await this.$api.post.getPostFeeds({ limit, page })
      commit('setFeeds', { isLoadMore, data: feedData.data.posts })
      commit('setPageDetail', feedData.data.pageDetail)
    } catch (err) {
      //
    }
  },
  async reactionPost ({ commit, state }, { on, type, postId }) {
    try {
      commit('toggleLikePost', postId)
      await this.$api.reaction.reactionPost({ on, type, postId })
    } catch (err) {
      //
      commit('toggleLikePost', postId)
    }
  }
}
